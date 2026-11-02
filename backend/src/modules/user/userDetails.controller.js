import {catchAsync} from "../../shared/errors/asynchronousError .js";
import APIFeatures from "../../shared/utils/features.js";
import {count, query} from "../jobs/jobs.service.js";
import {getUserDetails} from "./userDetails.service.js";
import uploadToCloudinary from "../../shared/utils/uploadToCloudinary.js";
import {ALLOWED_FIELDS, IMAGE_FIELDS} from "./userDetails.constants.js";
import cloudinary from "../../config/cloudinary.js";
import {correctPassword, createAuthSession, deleteRefreshToken} from "../auth/auth.service.js";
import {AppError} from "../../shared/errors/appError.js";
import {findUser, userById} from "../auth/user.service.js";
import {REFRESH_COOKIE_OPTIONS, REFRESH_TOKEN} from "../auth/auth.constants.js";
///@desc get users
///@route get /api/users
export const users = catchAsync(async (req, res, next) => {
    const features = new APIFeatures(query(), req.query).filter().sort().paginate();
    const totalCount = await count(features.filterQuery);

    const users = await features.query.select('user email headline openToWork profileImg').populate("user", 'name');
    return res.status(200).json({
        message: `Get user successfully`,
        data: {
            items: users,
            totalCount
        },

    });
})
///@desc get user
///@route get /api/users/:id
export const user = catchAsync(async (req, res, next) => {
    const user = await getUserDetails(req.params.id);
    return res.status(200).json({
        message: `Get user successfully`,
        data: user,
    })
})
///@desc get me
///@route get /api/users/me
export const myDetails = catchAsync(async (req, res, next) => {
    const user = await getUserDetails(req.user._id);
    return res.status(200).json({
        message: `Get user successfully`,
        data: user,
    })
})
///@desc update user
///@route patch /api/users/me
export const updateUser = catchAsync(async (req, res, next) => {
    if (req.file.buffer) {
        const result = await uploadToCloudinary(
            req.file.buffer, 'user-cv'
        )
    }
    const user = await getUserDetails(req.user._id);
    for (const field of ALLOWED_FIELDS) {
        if (req.body[field] !== undefined) {
            user[field] = req.body[field];
        }
    }
    const file = req.files?.['profileImg']?.[0];
    if (file) {
        const oldPublicId = user['profilePublicId'];
        if (oldPublicId) {
            await cloudinary.uploader.destroy(oldPublicId)
        }
        const result = await uploadToCloudinary(file.buffer, 'users');
        user['profileImg'] = result.secure_url;
        user['profilePublicId'] = result.public_id;
    }
    await user.save();
    return res.status(200).json({
        message: `Update user successfully`,
        data: user,
    })

})
///@desc update email
///@route patch /api/users/me/email
export const updateEmail = catchAsync(async (req, res, next) => {
    const {password, email} = req.body;
    const user = await userById(req.user._id);
    if (!user || !(await correctPassword(password, user.password))) {
        return next(new AppError('Invalid password', 401));
    }
    const existingUser = await findUser({email})
    if (existingUser && existingUser._id.toString() !== user._id.toString()) {
        return next(new AppError("Email is already in use", 409));
    }
    user.email = email;
    await user.save();
    await deleteRefreshToken(user._id)
    const {refreshToken, token} = await createAuthSession(({id: iser._id}))
    res.cookie(REFRESH_TOKEN, refreshToken, REFRESH_COOKIE_OPTIONS);
    return res.status(200).json({
        message: "Email updated successfully",
        token: token,
    });
})
///@desc update name
///@route patch /api/users/me/name
export const updateName = catchAsync(async (req, res, next) => {
    const {password, name} = req.body;
    const user = await userById(req.user._id);
    if (!user || !(await correctPassword(password, user.password))) {
        return next(new AppError('Invalid password', 401));
    }
    user.name = name;
    await user.save();
    await deleteRefreshToken(user._id)
    const {refreshToken, token} = await createAuthSession(({id: iser._id}))
    res.cookie(REFRESH_TOKEN, refreshToken, REFRESH_COOKIE_OPTIONS);
    return res.status(200).json({
        message: "Name updated successfully",
        token: token,
    });
})
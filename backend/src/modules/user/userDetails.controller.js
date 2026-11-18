import {catchAsync} from "../../shared/errors/asynchronousError .js";
import APIFeatures from "../../shared/utils/features.js";
import {count, query} from "../jobs/jobs.service.js";
import {getUserDetails} from "./userDetails.service.js";
import uploadToCloudinary from "../../shared/utils/uploadToCloudinary.js";
import {ALLOWED_FIELDS, IMAGE_FIELDS} from "./userDetails.constants.js";
import cloudinary from "../../config/cloudinary.js";
import {
    correctPassword,
    createAuthSession,
    deleteRefreshToken,
    findUserCompanyMemberships
} from "../auth/auth.service.js";
import {AppError} from "../../shared/errors/appError.js";
import {findUser, userById} from "../auth/user.service.js";
import {REFRESH_COOKIE_OPTIONS, REFRESH_TOKEN} from "../auth/auth.constants.js";
///@desc get users
///@route get /api/users
export const users = catchAsync(async (req, res, next) => {
    const features = new APIFeatures(query(), req.query,['name'])
    await features.filter();
    features.sort().paginate();
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
///@route get /api/users/me/profile
export const myDetails = catchAsync(async (req, res, next) => {
    const user = await getUserDetails(req.user._id);
    if(!user||user.length===0){
        return next(new AppError('Invalid', 401));
    }
    return res.status(200).json({
        message: `Get user successfully`,
        data: user[0],
    })
})
///me
export const me = catchAsync(async (req, res, next) => {
    const memberships = await findUserCompanyMemberships(req.user._id);

    const userWithoutPassword = req.user.toObject();
    delete userWithoutPassword.password;

    return res.status(200).json({
        message: `Get user successfully`,
        data: {...userWithoutPassword,memberships},
    })
})
///@desc update user
///@route patch /api/users/me

export const updateUser = catchAsync(async (req, res, next) => {
    const user = await userById(req.user._id);

    if (!user) {
        return next(new AppError('User not found', 404));
    }

    const detailsResult = await getUserDetails(req.user._id);
    const details = detailsResult?.[0];

    if (!details) {
        return next(new AppError('User details not found', 404));
    }

    const parseField = (value) => {
        if (typeof value !== 'string') return value;

        try {
            return JSON.parse(value);
        } catch {
            return value;
        }
    };

    const body = {
        ...req.body,
        skills: parseField(req.body.skills),
        experience: parseField(req.body.experience),
        education: parseField(req.body.education),
        contact: parseField(req.body.contact),
    };

    if (body.name !== undefined) {
        user.name = body.name;
        await user.save();
    }

    const {
        headline,
        location,
        bio,
        openToWork,
        skills,
        experience,
        education,
        contact
    } = body;

    if (headline !== undefined) details.headline = headline;
    if (location !== undefined) details.location = location;
    if (bio !== undefined) details.bio = bio;
    if (openToWork !== undefined) {
        details.openToWork = openToWork === 'true' || openToWork === true;
    }
    if (skills !== undefined) details.skills = skills;

    if (experience !== undefined) {
        details.experience = experience.map((e) => ({
            position: e.position,
            company: e.company,
            startAt: e.startAt ? new Date(e.startAt) : null,
            endAt: e.endAt ? new Date(e.endAt) : null,
            description: e.description ?? ''
        }));
    }
    if (education !== undefined) {
        details.education = education.map((e) => ({
            degree: e.degree,
            institution: e.institution,
            fieldOfStudy: e.fieldOfStudy ?? '',
            startAt: e.startAt ? new Date(e.startAt) : null,
            endAt: e.endAt ? new Date(e.endAt) : null
        }));
    }

    if (contact) {
        if (contact.phone !== undefined) {
            details.phone = contact.phone;
        }

        if (contact.linkedin !== undefined) {
            details.LinkedIn = contact.linkedin;
        }

        if (contact.website !== undefined) {
            details.website = contact.website;
        }

        if (contact.visibility !== undefined) {
            details.contactVisibility = contact.visibility;
        }
    }

    const profileFile = req.files?.profileImg?.[0];

    if (profileFile) {
        if (details.profilePublicId) {
            await cloudinary.uploader.destroy(details.profilePublicId);
        }

        const result = await uploadToCloudinary(
            profileFile.buffer,
            'users'
        );

        details.profileImg = result.secure_url;
        details.profilePublicId = result.public_id;
    }

    if (body.deleteAvatar === 'true') {
        if (details.profilePublicId) {
            await cloudinary.uploader.destroy(details.profilePublicId);
        }

        details.profileImg = '';
        details.profilePublicId = '';
    }

    const cvFile = req.files?.cv?.[0];

    if (cvFile) {
        if (details.cvPublicId) {
            await cloudinary.uploader.destroy(details.cvPublicId);
        }

        const result = await uploadToCloudinary(
            cvFile.buffer,
            'user-cv'
        );

        details.cv = result.secure_url;
        details.cvPublicId = result.public_id;
    }

    if (body.deleteCv === 'true') {
        if (details.cvPublicId) {
            await cloudinary.uploader.destroy(details.cvPublicId);
        }

        details.cv = '';
        details.cvPublicId = '';
    }

    await details.save();

    return res.status(200).json({
        message: 'Profile updated successfully',
        data: {
            user: {
                name: user.name,
                email: user.email
            },
            avatarUrl: details.profileImg,
            cvUrl: details.cv,
            cvName: details.cv ? 'CV.pdf' : '',
            headline: details.headline,
            location: details.location,
            bio: details.bio,
            openToWork: details.openToWork,
            skills: details.skills,
            experience: details.experience,
            education: details.education,
            contact: {
                phone: details.phone,
                website: details.website,
                linkedin: details.LinkedIn,
                visibility: details.contactVisibility
            }
        }
    });
});
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
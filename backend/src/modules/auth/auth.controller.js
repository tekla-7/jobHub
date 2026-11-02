import {
    correctPassword,
    createAuthSession, deleteRefreshToken, findById, findRefreshToken, findUser,
    registerCompany,
    registerCompanyMember,
    registerUser
} from "./auth.service.js";
import {catchAsync} from "../../shared/errors/asynchronousError .js";
import {AppError} from "../../shared/errors/appError.js";
import {createJSONToken, validateJSONRefreshToken} from "../../shared/utils/auth.js";
import {REFRESH_COOKIE_OPTIONS, REFRESH_TOKEN} from "./auth.constants.js";
import {registerUserDetails} from "../user/userDetails.service.js";
import mongoose from "mongoose";
import {hash} from "bcryptjs";
///@desc create new user
///@route POST /api/auth/register
export const register = catchAsync(async (req, res, next) => {
    const {type} = req.body;
    if (!['user', 'company'].includes(type)) {
        return next(new AppError('Type is necessary', 400));
    }
    try {
        const session = await mongoose.startSession();
        let user;
        let company;
        session.startTransaction();
        const {name, email, password, confirmPassword, companyName} = req.body;
        user = await registerUser({
            name,
            email,
            password,
            confirmPassword,
        }, session);
        if (type === 'company') {
            company = await registerCompany(companyName, session);
            await registerCompanyMember({user: user.id, company: company.id, role: 'Owner'}, session)


        }
        await registerUserDetails(user.id, session)
        await session.commitTransaction()

        const {refreshToken, token} = await createAuthSession({
            id: user.id,
        });

        res.cookie(REFRESH_TOKEN, refreshToken, REFRESH_COOKIE_OPTIONS);
        res.status(201).json({
            message: `${type} created successfully`,
            data: {
                user,
                userDetails,
                ...(company && {compnay})
            },
            type,
            token
        });
    } catch (error) {
        await session.abortTransaction();
        throw error;
    } finally {
        await session.endSession()
    }

})

///@desc create new user
///@route POST /api/auth/login
export const login = catchAsync(async (req, res, next) => {
    const {email, password} = req.body;
    if (!email || !password) {
        return next(new AppError('Please provide email and password!', 400))
    }
    const user = await findUser(email);
    if (!user || !(await correctPassword(password, user.password))) {
        return next(new AppError('Invalid email or password', 401));
    }
    const {refreshToken, token} = await createAuthSession({
        id: user._id,
    });
    const userWithoutPassword = user.toObject();
    delete userWithoutPassword.password;
    res.cookie(REFRESH_TOKEN, refreshToken, REFRESH_COOKIE_OPTIONS);
    res.status(200).json({
        message: `Login successfully`,
        token,
        user: userWithoutPassword
    });
})

///@desc create new user
///@route POST /api/auth/refresh
export const refresh = catchAsync(async (req, res, next) => {
    const refreshToken = req.cookies[REFRESH_TOKEN];
    if (!refreshToken) {
        return next(new AppError('Refresh token not found.User is unauthorized', 401));
    }
    const {id} = validateJSONRefreshToken(refreshToken);
    const storeRefreshToken = await findRefreshToken(refreshToken);
    if (!storeRefreshToken) {
        return next(new AppError('Refresh token not found.User is unauthorized', 401));
    }
    if (storeRefreshToken.expiresAt <= new Date()) {
        return next(
            new AppError(
                'Refresh token expired. User is unauthorized',
                401
            )
        );
    }
    const newAccessToken = createJSONToken(id);
    return res.status(200).json({
        message: "New access token generated",
        token: newAccessToken,
    });
})

///@desc logout
///@route POST /api/auth/logout
export const logout = catchAsync(async (req, res, next) => {
    const refreshToken = req.cookies[REFRESH_TOKEN];
    if (!refreshToken) {
        return next(new AppError('Refresh token not found.User is unauthorized', 401));
    }
    await deleteRefreshToken(refreshToken);
    return res.status(200).json({
        message: "Log out successfully",
    });
})

///@desc change password
///@route Patch /api/auth/change-password
export const changePassword = catchAsync(async (req, res, next) => {
    const {password, newPassword, newConfirmPassword} = req.body
    const id = req.user._id
    const user = await findById(id);
    if (!user || !(await correctPassword(password, user.password))) {
        return next(new AppError('Invalid password', 401));
    }
    if (newPassword !== newConfirmPassword) {
        return next(new AppError('Invalid password', 401));
    }
    user.password = await hash(this.password, 10);
    await user.save();
    await deleteRefreshToken(user._id)
    const {refreshToken,token}=await createAuthSession(({id:iser._id}))
    res.cookie(REFRESH_TOKEN, refreshToken, REFRESH_COOKIE_OPTIONS);
    return res.status(200).json({
        message: "Password changed successfully",
        token: token,
    });

})
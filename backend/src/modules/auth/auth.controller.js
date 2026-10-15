import {
    correctPassword,
    createAuthSession, deleteRefreshToken, findRefreshToken, findUser,
    registerCompany,
    registerCompanyMember,
    registerUser
} from "./auth.service.js";
import {catchAsync} from "../../shared/errors/asynchronousError .js";
import {AppError} from "../../shared/errors/appError.js";
import {createJSONToken, validateJSONRefreshToken} from "../../shared/utils/auth.js";
import {REFRESH_COOKIE_OPTIONS, REFRESH_TOKEN} from "./auth.constants.js";
///@desc create new user
///@route POST /api/auth/register
export const register = catchAsync(async (req, res, next) => {
    const {type} = req.body;
    let data = {};
    if (type === 'user') {
        const {name, email, password, confirmPassword, company} = req.body;
        const user = await registerUser({
            name,
            email,
            password,
            confirmPassword,
        });
        data = {
            user
        };
    } else if (type === 'company') {
        const {name, email, password, confirmPassword, companyName} = req.body;
        const company = await registerCompany(companyName);
        const user = await registerUser({
            name,
            email,
            password,
            confirmPassword,
        });
        await registerCompanyMember({user: user.id, company: company.id, role: 'Owner'})
        data = {
            user,
            company
        };
    } else {
        return next(new AppError('Type is necessary', 400));

    }
    const {refreshToken, token} = await createAuthSession({
        id: data.user.id,
    });

    res.cookie(REFRESH_TOKEN, refreshToken, REFRESH_COOKIE_OPTIONS);
    res.status(201).json({
        message: `${type} created successfully`,
        data,
        type,
        token
    });


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
    if(!storeRefreshToken){
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
///@desc create new user
///@route POST /api/auth/logout
export const logout=catchAsync(async (req,res,next)=>{
    const refreshToken = req.cookies[REFRESH_TOKEN];
    if (!refreshToken) {
        return next(new AppError('Refresh token not found.User is unauthorized', 401));
    }
    await deleteRefreshToken(refreshToken);
    return res.status(200).json({
        message: "Log out successfully",
    });
})
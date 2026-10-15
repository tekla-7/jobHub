import {catchAsync} from "../shared/errors/asynchronousError .js";
import {AppError} from "../shared/errors/appError.js";
import jwt from "jsonwebtoken";
import { promisify } from 'util';
import User, {userSchema} from "../modules/user/user.model.js";

export const protect = catchAsync(async (req, res, next) => {
    let token;

    if(req.headers.authorization && req.headers.authorization.startsWith("Bearer ")){
        token=req.headers.authorization.split(" ")[1];
    }
    if(!token){
        return next(new AppError('You are not logged in. Please log in to get access',401));
    }
    const decoded=await promisify(jwt.verify)(token, process.env.JWT_SECRET);
    const currentUser=await User.findById(decoded.id);
    if(!currentUser){
        return next(new AppError('The users belonging to this token does no longer exist',401));
    }
    if(currentUser.changedPasswordAfter(decoded.iat)){
        return next(new AppError('User recently changed password! Please log in again',401));

    }
    req.user=currentUser;
    next()
})


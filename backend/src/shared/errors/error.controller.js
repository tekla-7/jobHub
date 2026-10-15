import {AppError} from "./appError.js";

const sendErrorDev = (err, res) => {
    res.status(err.statusCode).json({status: err.status, message: err.message, stack: err.stack, error: err});
}
const sendErrorProd = (err, res) => {
    if (err.isOperational) {
        res.status(err.statusCode).json({status: err.status, message: err.message});
    }else {
        res.status(500).json({status: 'error', message: 'Something went wrong!'});
    }
}
const handleCastErrorDB=(err)=>{
    const message = `Invalid ${err.path}:${err.value}`;
    return new AppError(message,400);

}
const handleDuplicateErrorDB=(err)=>{
    // const value=err.message;
    // const message = `Duplicate field value: ${value}. Please use another value!`;
    return new AppError(err.message, 400);

}
const handleValidationErrorDB=(err)=>{
    const errors=Object.values(err.errors).map(v=>v.message)
    const message = `Invalid input data.${errors.join('. ')}`;
    return new AppError(message,400);
}
export const GlobalErrorHandler = (err, req, res, next) => {
    err.statusCode = err.statusCode || 500;
    err.status = err.status || 'error';

    if (process.env.NODE_ENV === 'development') {
        sendErrorDev(err, res)
    } else if (process.env.NODE_ENV === 'production') {
        let error= err
        if(error.name==='CastError') {
           error = handleCastErrorDB(error)
        }
        if(error.code===11000) {
            error = handleDuplicateErrorDB(error)
        }
        if(error.name==='ValidationError') {
            error = handleValidationErrorDB(error)
        }
        sendErrorProd(error, res)
    }
}
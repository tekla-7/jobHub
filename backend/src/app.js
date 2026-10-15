import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser"
import rateLimit from "express-rate-limit";
import helmet from "helmet";
import xss from 'xss-clean'
import hpp from 'hpp'
import authRoutes from "./modules/auth/auth.routes.js";

import mongoSanitize from "@exortek/express-mongo-sanitize";
import routes from "./routes/index.js";
import {AppError} from "./shared/errors/appError.js";
import {GlobalErrorHandler} from "./shared/errors/error.controller.js";
const allowedOrigins = ["http://localhost:5173"];
const limiter=rateLimit({
    max: 10,
    windowMs: 60*1000,
    message:'Too many requests from IO,please try again in an minute'
})
const app = express();

// app.use(cors({
//     origin: (origin, callback) => {
//         if (!origin || allowedOrigins.includes(origin)) {
//             callback(null, true);
//         } else {
//             callback(new Error("Not allowed by CORS"));
//         }
//     },
//     credentials: true,
// }));
app.use(limiter)
app.use(helmet())
// app.use(mongoSanitize())
// app.use(xss())
app.use(express.json())
app.use(cookieParser())
//parameter pollution
// app.use(hpp({whitelist:[]}))
app.use(express.urlencoded({extended: false}));
app.use((req, res, next) => {
    console.log('--- INCOMING REQUEST ---');
    console.log('Method:', req.method);
    console.log('URL:', req.originalUrl);
    console.log('Body:', req.body);
    console.log('Headers:', req.headers);

    next();
});

app.use('/api',routes)
app.use((req, res,next) => {
    next(new AppError(`Can't find ${req.originalUrl} on this server!`,404));
})
app.use(GlobalErrorHandler)
export default app;
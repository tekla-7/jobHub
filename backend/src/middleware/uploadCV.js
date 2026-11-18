
import multer from "multer";
import { AppError } from "../shared/errors/appError.js";

const storage = multer.memoryStorage();

const limits = {
    fileSize: 5 * 1024 * 1024
};

const fileFilter = (req, file, cb) => {
    if (file.mimetype === 'application/pdf') {
        cb(null, true);
    } else {
        cb(new AppError('Only PDF files are allowed', 400));
    }
};

const uploadCV = multer({
    storage,
    limits,
    fileFilter
});

export default uploadCV;

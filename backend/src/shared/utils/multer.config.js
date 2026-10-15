import multer from "multer";
import {AppError} from "../errors/appError.js";

const ALLOWED_TYPES = ['image/jpeg', 'image/png', 'image/jpg', 'image/webp', 'image/jpeg', 'image/gif'];
export const storage = multer.memoryStorage();
export const limits = {fileSize: 1024 * 1024 * 5}
export const fileFilter = (req, file, cb) => {
    if (ALLOWED_TYPES.includes(file.mimetype)) {
        cb(null, true)
    } else {
        cb(new AppError('Only JPEG, PNG, JPG and WEBP images are allowed'), false);
    }

}

const upload = multer({
    storage,
    limits,
    fileFilter,
})
export default upload
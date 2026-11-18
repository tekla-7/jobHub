import multer from "multer";
import { AppError } from "../shared/errors/appError.js";

const storage = multer.memoryStorage();

const uploadProfileFiles = multer({
    storage,
    limits: {
        fileSize: 5 * 1024 * 1024
    },
    fileFilter: (req, file, cb) => {
        if (file.fieldname === 'profileImg') {
            const allowedImages = [
                'image/jpeg',
                'image/png',
                'image/webp',
                'image/gif'
            ];

            if (allowedImages.includes(file.mimetype)) {
                return cb(null, true);
            }

            return cb(new AppError('Invalid image format', 400));
        }

        if (file.fieldname === 'cv') {
            if (file.mimetype === 'application/pdf') {
                return cb(null, true);
            }

            return cb(new AppError('Only PDF files are allowed', 400));
        }

        cb(new AppError('Unexpected file field', 400));
    }
});

export default uploadProfileFiles;

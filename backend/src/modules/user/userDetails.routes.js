import express from "express";
import {protect} from "../../middleware/auth.middleware.js";
import {me, myDetails, updateEmail, updateName, updateUser, user, users} from "./userDetails.controller.js";
import upload from "../../shared/utils/multer.config.js";
import uploadCV from "../../middleware/uploadCV.js";
import uploadProfileFiles from "../../middleware/updateProfileFiles.js";

const router = express.Router();
router.use(protect)
router.get('', users)
router.get('/me', me)
router.get('/me/profile', myDetails)
router.get('/:id', user)
router.patch('/me',
    uploadProfileFiles.fields([
        { name: 'profileImg', maxCount: 1 },
        { name: 'cv', maxCount: 1 }
    ]),  updateUser)
router.patch('/me/email', updateEmail)
router.patch('/me/name', updateName)
export default router;
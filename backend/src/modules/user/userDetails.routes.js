import express from "express";
import {protect} from "../../middleware/auth.middleware.js";
import router from "../invitation/invitation.routes.js";
import {myDetails, updateEmail, updateName, updateUser, user, users} from "./userDetails.controller.js";
import upload from "../../shared/utils/multer.config.js";
import uploadCV from "../../middleware/uploadCV.js";

const route=express.Router();
router.use(protect)
route.get('',users)
route.get('/me',myDetails)
route.get('/:id', user )
route.patch('/me',upload.fields([
    {name: 'profileImg', maxCount: 1},
]),uploadCV.single('cv'),updateUser)
router.patch('/me/email',updateEmail)
route.patch('/me/name',updateName)
export default router;
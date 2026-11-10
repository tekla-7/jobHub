import express from "express";
import {protect} from "../../middleware/auth.middleware.js";
import {me, myDetails, updateEmail, updateName, updateUser, user, users} from "./userDetails.controller.js";
import upload from "../../shared/utils/multer.config.js";
import uploadCV from "../../middleware/uploadCV.js";

const router=express.Router();
router.use(protect)
router.get('',users)
router.get('/me',me)
router.get('/myDetails',myDetails)
router.get('/:id', user )
router.patch('/me',upload.fields([
    {name: 'profileImg', maxCount: 1},
]),uploadCV.single('cv'),updateUser)
router.patch('/me/email',updateEmail)
router.patch('/me/name',updateName)
export default router;
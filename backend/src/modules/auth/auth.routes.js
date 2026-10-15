import express from "express";
import {login, logout, refresh, register} from "./auth.controller.js";
import {protect} from "../../middleware/auth.middleware.js";

const router=express.Router();
router.post('/register',register)
router.post('/login', login)
router.post('/refreshToken', refresh);
router.use(protect)
router.post('/logout', logout);
// router.post('/change-password',resetPassword)


export default router;
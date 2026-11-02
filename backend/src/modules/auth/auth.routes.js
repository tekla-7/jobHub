import express from "express";
import {changePassword, login, logout, refresh, register} from "./auth.controller.js";
import {protect} from "../../middleware/auth.middleware.js";

const router=express.Router();
router.post('/register',register)
router.post('/login', login)
router.post('/refreshToken', refresh);
router.use(protect)
router.post('/logout', logout);
router.patch('/change-password',changePassword)


export default router;
import express from "express";
import authRoutes from "../modules/auth/auth.routes.js";
import companyRoutes from "../modules/company/company.routes.js";

const router=express.Router();
router.use('/auth', authRoutes);
router.use('/company', companyRoutes);

export default router;
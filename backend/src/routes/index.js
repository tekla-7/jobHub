import express from "express";
import authRoutes from "../modules/auth/auth.routes.js";
import companyRoutes from "../modules/company/company.routes.js";
import companyMemberRoutes from "../modules/companyMember/company-member.routes.js";
import invitationRoutes from "../modules/invitation/invitation.router.js";

const router=express.Router();
router.use('/auth', authRoutes);
router.use('/companies', companyRoutes);
router.use('/company/:companyId', companyMemberRoutes);
router.use('/invitations', invitationRoutes);


export default router;
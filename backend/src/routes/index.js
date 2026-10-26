import express from "express";
import authRoutes from "../modules/auth/auth.routes.js";
import companyRoutes from "../modules/company/company.routes.js";
import companyMemberRoutes from "../modules/companyMember/company-member.routes.js";
import invitationRoutes from "../modules/invitation/invitation.routes.js";
import jobsRoutes from "../modules/jobs/jobs.routes.js";
import applicationRoutes from "../modules/application/application.routes.js";
const router=express.Router();
router.use('/auth', authRoutes);
router.use('/companies', companyRoutes);
router.use('/company/:companyId', companyMemberRoutes);
router.use('/invitations', invitationRoutes);
router.use('/jobs', jobsRoutes);
router.use('/applications', applicationRoutes);


export default router;
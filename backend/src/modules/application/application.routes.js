import express from "express";
import {protect} from "../../middleware/auth.middleware.js";
import uploadCV from "../../middleware/uploadCV.js";
import {
    applicationStatusChange,
    getApplication,
    myApplication,
    myCompanyApplication,
    submitApplication,
    withdrawApplication
} from "./application.controller.js";
import {authorizeCompanyMember} from "../../middleware/authorizeCompanyMember.js";
import {COMPANY_ROLES} from "../company/company.constants.js";

const router=express.Router();
router.use(protect);
router.post('/jobs/:jobId',uploadCV.single('cv'),submitApplication)
router.get('/me',myApplication)
router.get('/companies/:companyId',authorizeCompanyMember(COMPANY_ROLES.OWNER,COMPANY_ROLES.RECRUITER,COMPANY_ROLES.ADMIN),myCompanyApplication);
router.get('/:applicationId',getApplication)
router.patch('/:applicationId/withdraw',withdrawApplication)
router.patch('/:applicationId/status',authorizeCompanyMember(COMPANY_ROLES.OWNER,COMPANY_ROLES.RECRUITER,COMPANY_ROLES.ADMIN),applicationStatusChange)


export default router;
import express from "express";
import {protect} from "../../middleware/auth.middleware.js";
import {getCompanyJobs, getJobs, getJob, createJob, deleteJob, jobCategories} from "./jobs.controller.js";
import {authorizeCompanyMember} from "../../middleware/authorizeCompanyMember.js";
import {COMPANY_ROLES} from "../company/company.constants.js";

const router=express.Router();

router.get('/categories', jobCategories);
router.get('',getJobs)

router.use(protect)
router.get('/company/:companyId',getCompanyJobs)
router.get('/:jobId',getJob)
// router.use(authorizeCompanyMember([COMPANY_ROLES.OWNER,COMPANY_ROLES.ADMIN,COMPANY_ROLES.RECRUITER]))
router.post('/company/:companyId',authorizeCompanyMember([COMPANY_ROLES.OWNER,COMPANY_ROLES.ADMIN,COMPANY_ROLES.RECRUITER]),createJob)
router.patch('/company/:companyId/:jobId',authorizeCompanyMember([COMPANY_ROLES.OWNER,COMPANY_ROLES.ADMIN,COMPANY_ROLES.RECRUITER]),createJob)
router.delete('/company/:companyId/:jobId',authorizeCompanyMember([COMPANY_ROLES.OWNER,COMPANY_ROLES.ADMIN,COMPANY_ROLES.RECRUITER]),deleteJob)
export default router;
import express from "express";
import {protect} from "../../middleware/auth.middleware.js";
import {getCompanyJobs, getJobs, getJob, createJob, deleteJob} from "./jobs.controller.js";
import {authorizeCompanyMember} from "../../middleware/authorizeCompanyMember.js";
import {COMPANY_ROLES} from "../company/company.constants.js";

const router=express.Router();
router.use(protect)
router.get('',getJobs)
router.get('/company/:companyId',getCompanyJobs)
router.get('/:jobId',getJob)
router.use(authorizeCompanyMember([COMPANY_ROLES.OWNER,COMPANY_ROLES.ADMIN,COMPANY_ROLES.RECRUITER]))
router.post('/company/:companyId',createJob)
router.patch('/company/:companyId/:jobId',createJob)
router.delete('/company/:companyId/:jobId',deleteJob)
export default router;
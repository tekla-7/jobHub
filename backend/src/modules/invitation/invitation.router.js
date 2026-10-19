import express from "express";
import {protect} from "../../middleware/auth.middleware.js";
import {authorizeCompanyMember} from "../../middleware/authorizeCompanyMember.js";
import {COMPANY_ROLES} from "../company/company.constants.js";
import {
    acceptInvitation,
    cancelInvitation,
    createInvitation,
    getInvitation,
    rejectInvitation
} from "./invitation.controller.js";

const router=express.Router();

router.use(protect)
router.get('/',getInvitation)
router.post('/company/:companyId',authorizeCompanyMember([COMPANY_ROLES.OWNER,COMPANY_ROLES.ADMIN]),createInvitation)
router.patch('/accept', acceptInvitation)
router.patch('/reject',rejectInvitation )
router.patch('/company/:companyId/invitation/:id/cancel',authorizeCompanyMember([COMPANY_ROLES.OWNER,COMPANY_ROLES.ADMIN]),cancelInvitation )

export default router;
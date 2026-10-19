import express from "express";
import {protect} from "../../middleware/auth.middleware.js";
import {authorizeCompanyMember} from "../../middleware/authorizeCompanyMember.js";
import {COMPANY_ROLES} from "../company/company.constants.js";
import {companyMembers, deleteCompanyMember, updateCompanyMemberRole} from "./company-member.controller.js";

const router=express.Router({mergeParams:true});

router.use(protect,authorizeCompanyMember([COMPANY_ROLES.OWNER,COMPANY_ROLES.ADMIN]))
router.get('',companyMembers)
router.patch('/member/:id/role', updateCompanyMemberRole)
router.delete('/member/:id', deleteCompanyMember)

export default router;
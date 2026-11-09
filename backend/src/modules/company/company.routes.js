import express from "express";
import {protect} from "../../middleware/auth.middleware.js";
import {companies, company, updateCompany} from "./company.controller.js";
import {authorizeCompanyMember} from "../../middleware/authorizeCompanyMember.js";
import {COMPANY_ROLES} from "./company.constants.js";
import upload from "../../shared/utils/multer.config.js";

const router = express.Router();
router.use(protect)
router.get('', companies);
router.get('/:companyId', company);
router.patch('/:companyId', authorizeCompanyMember(COMPANY_ROLES.OWNER), upload.fields([
    {name: 'logo', maxCount: 1},
    {name: 'coverImg', maxCount: 1},
    {name: 'profileImg', maxCount: 1},
]),
updateCompany
);
// router.post('/change-password',resetPassword)


export default router;
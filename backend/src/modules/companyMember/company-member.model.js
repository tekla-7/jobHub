import mongoose from "mongoose";
import {COMPANY_ROLES} from "../company/company.constants.js";

export const companyMemberSchema=new mongoose.Schema({
    user:{
        type: mongoose.Schema.Types.ObjectId,
        required: true
    },
    company:{
        type: mongoose.Schema.Types.ObjectId,
        required: true
    },
    role:{
        type: String,
        enum: COMPANY_ROLES,
        default: COMPANY_ROLES.RECRUITER,
        required: true
    }
}, {
    timestamps: true
})

// Owner — full access, billing, can remove anyone,deactivate,edit profile
// Admin — manage jobs, applicants, and invite teammates
// Recruiter — manage jobs and applicants only
export default mongoose.model('CompanyMember', companyMemberSchema)
import CompanyMember from "./company-member.model.js";
import {company} from "../company/company.controller.js";

export const getCompanyMember = (companyId) => CompanyMember.find({company:companyId})
export const getTotalCount = (filter) => CompanyMember.countDocuments(filter);

export const getMemberById=(id)=>CompanyMember.findById(id);
export const deleteMember=(id)=>CompanyMember.deleteOne({_id:id})
import JobsModel from "../jobs/jobs.model.js";
import applicationModel from "./application.model.js";
import Company from "../company/company.model.js";
import {APPLICATION_STATUS} from "./application.constants.js";

export const findApplication=filter=>applicationModel.find(filter)
export const createApplication=createApplication=>applicationModel.create(createApplication)
export const userApplication=id=>applicationModel.findOne({candidate:id})
export const companyApplication=id=>applicationModel.findOne({candidate:id})
export const count=(filter)=>Company.countDocuments(filter)
export const getApplicationById=(id)=>applicationModel.findById(id)
export const isApplicationActive=(application)=>application.status!==APPLICATION_STATUS[3]&&application.status!==APPLICATION_STATUS[4]&&application.status!==APPLICATION_STATUS[5]

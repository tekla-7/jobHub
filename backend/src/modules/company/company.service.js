import Company from './company.model.js'

export const query=()=>Company.find();
export const count=(filter)=>Company.countDocuments(filter)
export const getCompany=(id)=>Company.findById(id)
export const editCompany=()=>Company.save()
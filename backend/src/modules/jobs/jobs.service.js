import Jobs from "./jobs.model.js";

export const query = () => Jobs.find();
export const count = (filter) => Jobs.countDocuments(filter);
export const companyJobs = (id) => Jobs.findOne({company: id});
export const job = (id) => Jobs.findById(id);
export const postJob=(detail)=>Jobs.create(detail)
export const removeJob=(id)=>Jobs.delete(id)
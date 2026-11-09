import SavedJobsModel from "./savedJobs.model.js";

export const query=(user)=>SavedJobsModel.find({user});
export const count=(filter)=>SavedJobsModel.countDocuments(filter);
export const create=(user,job)=>SavedJobsModel.create(user,job);
export const deleteSavedJob=(id)=>SavedJobsModel.findByIdAndDelete(id);

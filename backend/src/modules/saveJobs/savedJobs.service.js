import SavedJobsModel from "./savedJobs.model.js";

export const query = (user) => SavedJobsModel.find({user});
export const count = (filter) => SavedJobsModel.countDocuments(filter);
export const create = (user, job) => SavedJobsModel.create({user, job});
export const deleteSavedJob = (job, user) => SavedJobsModel.findOneAndDelete({job, user});
export const ids = async (userId) => {
    console.log('User ID:', userId);

    const allSaved = await SavedJobsModel.find({});

    console.log('All saved jobs:', allSaved);

    const result = await SavedJobsModel.distinct('job', {
        user: userId
    });

    console.log('Found IDs:', result);

    return result;
};
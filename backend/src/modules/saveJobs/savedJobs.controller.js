import {catchAsync} from "../../shared/errors/asynchronousError .js";
import APIFeatures from "../../shared/utils/features.js";
import {count, create, deleteSavedJob, ids, query} from "./savedJobs.service.js";
import {AppError} from "../../shared/errors/appError.js";


///@desc get users saved jobs
///@route get /api/savedJobs
export const savedJobs = catchAsync(async (req, res, next) => {
    const features = new APIFeatures(query(req.user._id), req.query,['name'])
    await features.filter();
    features.sort().paginate();
    const totalCount = await count(features.filterQuery);
    const savedJobs = await features.query.populate({
        path: 'job',
        select: 'company title description location',
        populate: {
            path: 'company',
            select: 'name'
        }
    });
    return res.status(200).json({
        message: `Get jobs successfully`,
        data: {
            items: savedJobs,
            totalCount
        },

    });
})
///@desc get users saved jobs
///@route get /api/savedJobs/ids
export const savedJobsIds = catchAsync(async (req, res, next) => {
    const Ids =await ids(req.user._id)
    return res.status(200).json({
        message: `Get jobs successfully`,
        data:Ids

    });
})
///@desc post users saved jobs
///@route post /api/savedJobs/:jobId
export const addSaveJob = catchAsync(async (req, res, next) => {
    const {jobId} = req.params;
    const id = req.user._id;
    const saveJob = await create( id,jobId);
    return res.status(200).json({
        message: `Saved job successfully`,
        data: saveJob
    })
})
///@desc delete users saved jobs
///@route post /api/savedJobs/:jobId
export const removeSaveJob = catchAsync(async (req, res, next) => {
    const {jobId} = req.params;
    const saveJob =await deleteSavedJob(jobId,req.user._id);
    if (!saveJob) {
        return next(new AppError('Save job not found', 404));
    }
    return res.status(200).json({
        message: `Remove job successfully`
    })
})
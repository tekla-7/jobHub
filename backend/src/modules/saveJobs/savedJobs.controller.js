import {catchAsync} from "../../shared/errors/asynchronousError .js";
import APIFeatures from "../../shared/utils/features.js";
import {count, create, query} from "./savedJobs.service.js";
import {AppError} from "../../shared/errors/appError.js";


///@desc get users saved jobs
///@route get /api/savedJobs
export const savedJobs = catchAsync(async (req, res, next) => {
    const features = new APIFeatures(query(req.user._id), req.query).filter().sort().paginate();
    const totalCount = await count(features.filterQuery);
    const savedJobs = await features.query.populate('user', 'name').populate({
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
///@desc post users saved jobs
///@route post /api/savedJobs/add
export const addSaveJob = catchAsync(async (req, res, next) => {
    const {jobId} = req.body;
    const id = req.user._id;
    const saveJob = await create(jobId, id);
    return res.status(200).json({
        message: `Saved job successfully`,
        data: saveJob
    })
})
///@desc delete users saved jobs
///@route post /api/savedJobs/remove/:id
export const removeSaveJob = catchAsync(async (req, res, next) => {
    const {id} = req.params;
    const job = query(req.user._id);
    if (!job || job._id !== req.user._id) {
        return next(new AppError('Invalid job or user', 401));

    }
    await job.deleteOne()
    return res.status(200).json({
        message: `Remove job successfully`
    })
})
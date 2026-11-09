import {catchAsync} from "../../shared/errors/asynchronousError .js";
import APIFeatures from "../../shared/utils/features.js";
import {query, count, companyJobs, job, postJob, removeJob} from "./jobs.service.js";
import {AppError} from "../../shared/errors/appError.js";
///@desc get jobs
///@route post /api/jobs
export const getJobs = catchAsync(async (req, res, next) => {
    const features = new APIFeatures(query(), req.query).filter().sort().paginate();
    const totalCount = await count(features.filterQuery);
    const jobs = await features.query;
    res.status(200).json({
        message: `Get jobs successfully`,
        data: {
            items: jobs,
            totalCount
        },

    });
})
///@desc get company jobs
///@route post /api/jobs/company/:companyId
export const getCompanyJobs = catchAsync(async (req, res, next) => {
    const {companyId} = req.params;
    const features = new APIFeatures(companyJobs(companyId), req.query).filter().sort().paginate();
    const totalCount = await count(features.filterQuery);
    const jobs = await features.query;
    res.status(200).json({
        message: `Get jobs successfully`,
        data: {
            items: jobs,
            totalCount
        },

    });
})
///@desc get job
///@route post /api/jobs/:jobId
export const getJob = catchAsync(async (req, res, next) => {
    const {jobId} = req.params;
    const jobDetail = await job(jobId).populate('company', ' name industry').populate('createdBy', 'name');
    res.status(200).json({
        message: `Get job successfully`,
        data: jobDetail

    });
})
///@desc post job
///@route post /api/jobs/job
export const createJob = catchAsync(async (req, res, next) => {
    const {companyId} = req.params;
    const {
        title,
        description,
        location,
        department,
        employmentType,
        workplaceType,
        salaryMin,
        salaryMax,
        skills,
        status,
        startAt,
        endAt
    } = req.body;
    const job = await postJob({
        company: companyId,
        createdBy: req.user._id,
        title,
        description,
        location,
        department,
        employmentType,
        workplaceType,
        salaryMin,
        salaryMax,
        skills,
        status,
        startAt,
        endAt
    })
    res.status(200).json({
        message: `Post job successfully`,
        data: job

    });
})
///@desc update job
///@route patch /api/jobs/job
export const updateJob = catchAsync(async (req, res, next) => {
    const {companyId, jobId} = req.params;
    const jobDetail = await job(jobId)
    if (!jobDetail) {
        return next(new AppError('Job bit found', 404))
    }
    const request = {...req.body};
    const notAllow = ['_id', 'company', 'createdBy']
    notAllow.forEach(el => delete request[el]);
    Object.keys(request).forEach(key => {
        jobDetail[key] = request[key];
    })
    await jobDetail.save();
    res.status(200).json({
        message: `Update job successfully`,
        data: jobDetail
    })
})
///@desc delete job
///@route delete /api/jobs/job
export const deleteJob = catchAsync(async (req, res, next) => {
    const {companyId, jobId} = req.params;
    await removeJob(jobId)
    res.status(200).json({
        message: `Update job successfully`,
        data: jobDetail
    })
})
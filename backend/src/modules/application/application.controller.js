import {catchAsync} from "../../shared/errors/asynchronousError .js";
import {AppError} from "../../shared/errors/appError.js";
import {job} from "../jobs/jobs.service.js";
import {
    companyApplication,
    count,
    createApplication,
    findApplication,
    getApplicationById, isApplicationActive,
    userApplication
} from "./application.service.js";
import uploadToCloudinary from "../../shared/utils/uploadToCloudinary.js";
import APIFeatures from "../../shared/utils/features.js";
import {APPLICATION_STATUS} from "./application.constants.js";

///@desc post application
///@route post /api/application/jobs/:jobId
export const submitApplication = catchAsync(async (req, res, next) => {
    const {jobId} = req.params;
    const {coverLetter} = req.body;
    const jobDetail = await job(jobId);
    if (!jobDetail) {
        return next(new AppError('Job not found', 404));
    }
    const existing = await findApplication({
        candidate: req.user._id,
        job: jobId,
    })
    if (existing) {
        return next(new AppError('You have already applied for this job', 409));

    }
    const result = await uploadToCloudinary(
        req.file.buffer, 'cvs'
    )
    const application = await createApplication({
        candidate: req.user._id,
        job: jobId,
        cv: result.secure_url,
        coverLetter,
    })
    res.status(200).json({
        message: 'Successfully created application',
        data: application,
    })
})
///@desc get my application
///@route get /api/application/me
export const myApplication = catchAsync(async (req, res, next) => {
    const id = req.user._id;
    const features = new APIFeatures(userApplication(id), req.query).filter().sort().paginate();
    const totalCount = await count(features.filterQuery);
    const application = await features.query.populate({
        path: 'job',
        select: 'company title description location status',
        populate: {
            path: 'company',
            select: 'name'
        }
    });
    res.status(200).json({
        message: `Get application successfully`,
        data: {
            items: application,
            totalCount
        },

    });
})
///@desc get company application
///@route get /api/application/companies/:companyId
export const myCompanyApplication = catchAsync(async (req, res, next) => {
    const {companyId} = req.params;
    const features = new APIFeatures(companyApplication(companyId), req.query).filter().sort().paginate();
    const totalCount = await count(features.filterQuery);
    const application = await features.query.populate('candidate', 'name');
    res.status(200).json({
        message: `Get application successfully`,
        data: {
            items: application,
            totalCount
        },

    });
})
///@desc get  application
///@route get /api/application/:applicationId
export const getApplication = catchAsync(async (req, res, next) => {
    const {applicationId} = req.params;
    const application = await getApplicationById(applicationId).populate('candidate', 'name').populate({
        path: 'job',
        select: 'company title description location',
        populate: {
            path: 'company',
            select: 'name'
        }
    })
    res.status(200).json({
        message: `Get application successfully`,
        data: application

    });
})
///@desc patch  application
///@route patch /api/application/:applicationId/withdraw
export const withdrawApplication = catchAsync(async (req, res, next) => {
    const {applicationId} = req.params;
    const application = await getApplicationById(applicationId);
    if (!application) {
        return next(new AppError('Application not found', 404));
    }
    if (!application.candidate.toString() !== req.user._id.toString()) {
        return next(new AppError('Application not found', 404));
    }
    if (!isApplicationActive(application)) {
        return next(new AppError('This application can no longer be updated', 400));
    }
    application.status = APPLICATION_STATUS[5];
    await application.save();
    res.status(200).json({
        message: `Update application successfully`,
        data: application
    });
})
///@desc patch  application
///@route patch /api/application/:applicationId/status
export const applicationStatusChange = catchAsync(async (req, res, next) => {
    const {applicationId} = req.params;
    const application = await getApplicationById(applicationId);
    const {status}=req.body
    if (!isApplicationActive(application)) {
        return next(new AppError('This application can no longer be updated', 400));
    }
    if(status===APPLICATION_STATUS[5]){
        return next(new AppError('You cannot withdraw an application', 400));

    }
    application.status=status;
    await application.save();
    res.status(200).json({
        message: `Update application successfully`,
        data: application
    });
})
import {catchAsync} from "../../shared/errors/asynchronousError .js";
import Job from "../jobs/jobs.model.js";
import Company from "../company/company.model.js";
import User from "../auth/user.model.js";
import Application from "../application/application.model.js";

export const platformStats = catchAsync(async (req, res) => {
    const [
        activeJobs,
        companies,
        candidates,
        hires,
    ] = await Promise.all([
        Job.countDocuments({status: "active"}),
        Company.countDocuments(),
        User.countDocuments(),
        Application.countDocuments({status: "hired"}),
    ]);

    res.status(200).json({
        status: "success",
        data: [
            {value: activeJobs, label: 'Active jobs'},
            {value: companies, label: 'Companies'},
            {value: candidates, label: 'Candidates'},
            {value: hires, label: 'Hires made'},

        ],
    });
});
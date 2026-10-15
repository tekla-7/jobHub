import {catchAsync} from "../../shared/errors/asynchronousError .js";
import APIFeatures from "../../shared/utils/features.js";
import {count, editCompany, getCompany, query} from "./company.service.js";
import {ALLOWED_FIELDS, IMAGE_FIELDS} from "./company.constants.js";
import uploadTOCloudinary from "../../shared/utils/uploadToCloudinary.js";
import uploadToCloudinary from "../../shared/utils/uploadToCloudinary.js";
import cloudinary from "../../config/cloudinary.js";
///@desc get companies
///@route get /api/company
export const companies = catchAsync(async (req, res, next) => {
    const features = new APIFeatures(query(), req.query).filter().sort().paginate();
    const totalCount = await count(features.filterQuery);

    const companies = await features.query;
    res.status(200).json({
        message: `Get company successfully`,
        data: {
            items: companies,
            totalCount
        },

    });
})
///@desc get company
///@route get /api/company/:companyId
export const company = catchAsync(async (req, res, next) => {
    const company = await getCompany(req.params.companyId);
    res.status(200).json({
        message: `Get company successfully`,
        data: company,
    })
})
///@desc update company
///@route patch /api/company/:companyId
export const updateCompany = catchAsync(async (req, res, next) => {
    const company = await getCompany(req.params.companyId);
    for (const field of ALLOWED_FIELDS) {
        if (req.body[field] !== undefined) {
            company[field] = req.body[field];
        }
    }
    const oldPublicIds = [];
    for (const field of IMAGE_FIELDS) {
        const file = req.files?.[field]?.[0];
        if (file) {
            console.log(field);
            const idField = `${field}PublicId`;
            const oldPublicId = company[idField];
            if (oldPublicId) {
                oldPublicIds.push(oldPublicId);
            }
            const result = await uploadToCloudinary(file.buffer);
            company[field] = result.secure_url;
            company[idField] = result.public_id;
        }
    }


    const updatedCompany = await company.save();
    for (const id of oldPublicIds) {
        await cloudinary.uploader.destroy(id)
    }
    res.status(200).json({
        message: `Update company successfully`,
        data: updatedCompany,
    })
})
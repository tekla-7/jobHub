///@desc get all company-member
///@route get /api/company-members/company/:companyId
import {catchAsync} from "../../shared/errors/asynchronousError .js";
import APIFeatures from "../../shared/utils/features.js";
import {deleteMember, getCompanyMember, getMemberById, getTotalCount} from "./company-member.service.js";

export const companyMembers = catchAsync(async (req, res, next) => {
    const {companyId} = req.params;
    const features = new APIFeatures(getCompanyMember(companyId), req.query).filter().sort().paginate();
    const totalCount = await getTotalCount(features.filterQuery);
    const companies = await features.query.populate('user', 'name email');
    res.status(200).json({
        message: `Get company members successfully`,
        data: {
            items: companies,
            totalCount
        },

    });
})
///@desc update company-member
///@route patch /api/company-members/:id/role
export const updateCompanyMemberRole = catchAsync(async (req, res, next) => {
    const {id, role} = req.params;
    const member = await getMemberById(id);
    member.role = role;
    await member.save()
    return res.status(200).json({
        message: `Update member successfully`,
        data: member,
    })
})
///@desc delete company-member
///@route delete /api/company-members/:id
export const deleteCompanyMember = catchAsync(async (req, res, next) => {
    const {id} = req.params;
    await deleteMember(id)
    return res.status(200).json({
        message: `Delete member successfully`,
    })
})
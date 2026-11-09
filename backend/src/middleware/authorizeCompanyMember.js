import {catchAsync} from "../shared/errors/asynchronousError .js";
import CompanyMember from "../modules/companyMember/company-member.model.js";
import {AppError} from "../shared/errors/appError.js";

export const authorizeCompanyMember =(roles)=> catchAsync(async (req, res, next) => {
    const userId=req.user._id;
    const companyId=req.params.companyId;
    console.log({companyId,userId,params:req.params});
    const member=await CompanyMember.findOne({
        user:userId,
        company:companyId,
    })
    if(!member){
        return next(new AppError('You are not a member of this company', 403));
    }
    if(!roles.includes(member.role)){
        return next(new AppError("You don't have permission to perform this action", 403));
    }
    next()
})
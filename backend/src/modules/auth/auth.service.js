import User from "../user/user.model.js";
import Company from "../company/company.model.js";
import CompanyMember from "../companyMember/companyMember.model.js";
import bcrypt from "bcryptjs";

import RefreshToken from "./refreshToken.model.js";
import {createJSONRefreshToken, createJSONToken} from "../../shared/utils/auth.js";

export const registerUser = async ({name, email, password, confirmPassword,company}) => {
    return await User.create({
        name,
        email,
        password,
        confirmPassword,company
    });

};
export const registerCompany = async (name) => {
    return await Company.create({name});
};
export const registerCompanyMember = async ({user,company,role}) => {
    return await CompanyMember.create({user,company,role});
};
export const registerRefreshToken = async ({token, accountId, expiresAt}) => {
    return await RefreshToken.create({
        token, accountId, expiresAt
    })
}
export const createAuthSession = async ({ id }) => {
    const refreshToken = createJSONRefreshToken(id);
    const token = createJSONToken(id);

    const expiresAt = new Date(
        Date.now() + 7 * 24 * 60 * 60 * 1000
    );

    await registerRefreshToken({
        token: refreshToken,
        accountId: id,
        expiresAt
    });

    return {
        refreshToken,
        token
    };
};
export const findUser= (email)=>{
    return User.findOne({email}).select('+password');
}
export const findRefreshToken= (token)=>{
    return RefreshToken.findOne({token});
}
export const deleteRefreshToken= (token)=>{
    return RefreshToken.deleteOne({token});
}
export const correctPassword = (password, hashedPassword) => {
    return bcrypt.compare(password, hashedPassword);
};

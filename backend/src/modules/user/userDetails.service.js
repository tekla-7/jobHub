import UserDetailsModel from "./userDetails.model.js";
import RefreshToken from "../auth/refreshToken.model.js";
import CompanyMember from "../companyMember/company-member.model.js";
import UserModel from "../auth/user.model.js";
import SavedJobsModel from "../saveJobs/savedJobs.model.js";

export const registerUserDetails = async (userId, email, name, session) => {
    const [userDetail] = await UserDetailsModel.create(
        [{
            name,
            user: userId,
            phone: '',
            email: email,
            LinkedIn: '',
            location: '',
            bio: '',
            headline: '',
            about: '',
            skills: [],
            openToWork: false,
            experience: [],
            education: [],
            profileImg: '',
            cv: '',
            profilePublicId: '',
            cvPublicId: '',
            website: '',
        }],
        {session}
    );

    return userDetail;
};
export const query = () => UserDetailsModel.find();
export const count = (filter) => UserDetailsModel.countDocuments(filter)
export const getUserDetails = (id) => UserDetailsModel.find({user: id})

export const deleteUserAccount = async (userId, session) => {
    await UserDetailsModel.deleteOne({user: userId}, {session});

    await RefreshToken.deleteMany({user: userId}, {session});

    await SavedJobsModel.deleteMany({user: userId}, {session});

    await CompanyMember.deleteMany({user: userId}, {session});

    await UserModel.deleteOne({_id: userId}, {session});
};
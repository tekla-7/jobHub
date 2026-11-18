
import { api } from "../../core/api";
import { Profile, ProfileUpdate } from "./type";

interface UploadAvatarResponse {
    avatarUrl: string;
}

interface UploadCvResponse {
    cvUrl: string;
    cvName: string;
}

export const fetchProfile = () =>
    api.get<{ data: Profile }>('/users/me/profile')
        .then((r) => r.data.data);

export const updateProfile = (body: ProfileUpdate) =>
    api.patch<{ data: Profile }>('/users/me', body)
        .then((r) => r.data.data);

function upload<T>(field: string, file: File) {
    const form = new FormData();
    form.append(field, file);

    return api.patch<{ data: T }>('/users/me', form)
        .then((r) => r.data.data);
}

export const uploadAvatar = (file: File) =>
    upload<UploadAvatarResponse>('profileImg', file);

export const uploadCv = (file: File) =>
    upload<UploadCvResponse>('cv', file);

export const deleteAvatar = () => {
    const form = new FormData();
    form.append('deleteAvatar', 'true');

    return api.patch('/users/me', form)
        .then((r) => r.data.data);
};

export const deleteCv = () => {
    const form = new FormData();
    form.append('deleteCv', 'true');

    return api.patch('/users/me', form)
        .then((r) => r.data.data);
};

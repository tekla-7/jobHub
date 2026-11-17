import {api} from "../../core/api";
import {Profile, ProfileUpdate} from "./type";

export const fetchProfile = () => api.get<Profile>('/me/profile').then((r) => r.data);
export const updateProfile = (body: ProfileUpdate) => api.patch<Profile>('/me/profile', body).then((r) => r.data);

function upload<T>(url: string, field: string, file: File) {
    const form = new FormData();
    form.append(field, file);
    return api.post<T>(url, form).then((r) => r.data);
}
export const uploadAvatar = (file: File) => upload<{ avatarUrl: string }>('/me/profile/avatar', 'avatar', file);
export const deleteAvatar = () => api.delete('/me/profile/avatar');
export const uploadCv = (file: File) => upload<{ cvUrl: string; cvName: string }>('/me/profile/cv', 'cv', file);
export const deleteCv = () => api.delete('/me/profile/cv');
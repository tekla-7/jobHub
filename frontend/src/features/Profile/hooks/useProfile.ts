import {useAppDispatch, useAppSelector} from "../../../store/hooks";
import {useMutation, useQuery, useQueryClient} from "@tanstack/react-query";
import {deleteAvatar, deleteCv, fetchProfile, updateProfile, uploadAvatar, uploadCv} from "../api";
import {setUser} from "../../../store/user-slice";
import {Profile} from "../type";

const KEY = ['profile'];

export const useProfile = () => {
    const user = useAppSelector((s) => s.auth.user);
    return useQuery({ queryKey: KEY, queryFn: fetchProfile, enabled: !!user });
};

export function useUpdateProfile() {
    const qc = useQueryClient();
    const dispatch = useAppDispatch();
    const user = useAppSelector((s) => s.auth.user);
    return useMutation({
        mutationFn: updateProfile,
        onSuccess: (profile) => {
            qc.setQueryData(KEY, profile);
            if (user && profile.name !== user.name) dispatch(setUser({ ...user, name: profile.name }));
        },
    });
}

function usePatchProfile<TVars, TData>(fn: (v: TVars) => Promise<TData>, merge: (p: Profile, d: TData) => Profile) {
    const qc = useQueryClient();
    return useMutation({
        mutationFn: fn,
        onSuccess: (data) => qc.setQueryData<Profile>(KEY, (old) => (old ? merge(old, data) : old)),
    });
}

export const useUploadAvatar = () => usePatchProfile(uploadAvatar, (p, d) => ({ ...p, avatarUrl: d.avatarUrl }));
export const useDeleteAvatar = () => usePatchProfile(deleteAvatar, (p) => ({ ...p, avatarUrl: undefined }));
export const useUploadCv = () => usePatchProfile(uploadCv, (p, d) => ({ ...p, cvUrl: d.cvUrl, cvName: d.cvName }));
export const useDeleteCv = () => usePatchProfile(deleteCv, (p) => ({ ...p, cvUrl: undefined, cvName: undefined }));

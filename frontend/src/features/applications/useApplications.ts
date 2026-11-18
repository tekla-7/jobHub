import {useAppSelector} from "../../store/hooks";
import {fetchApplications, withdrawApplication} from "./api";
import {useMutation, useQuery, useQueryClient} from "@tanstack/react-query";

const KEY = ['applications'];

export const useApplications = () => {
    const user = useAppSelector((s) => s.auth.user);
    console.log(user);
    return useQuery({ queryKey: KEY, queryFn: fetchApplications, enabled: !!user });
};

export function useWithdrawApplication() {
    const qc = useQueryClient();
    return useMutation({
        mutationFn: withdrawApplication,
        onSuccess: () => {
            qc.invalidateQueries({ queryKey: KEY });
            qc.invalidateQueries({ queryKey: ['job'] });
        },
    });
}

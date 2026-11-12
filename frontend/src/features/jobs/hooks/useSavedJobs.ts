import {useAppSelector} from "../../../store/hooks";
import {useMutation, useQuery, useQueryClient} from "@tanstack/react-query";
import {api} from "../../../core/api";

const KEY = ['saved-job-ids'];

export function useSavedJobs() {
    const user = useAppSelector((s) => s.auth.user);
    return useQuery({
        queryKey: KEY,
        queryFn: () => api.get<{ data:string[] }>('/savedJobs/Ids').then((r) => r.data.data),
        enabled: !!user,
    });
}

export function useToggleSaveJob() {
    const qc = useQueryClient();
    return useMutation({
        mutationFn: ({ id, saved }: { id: string; saved: boolean }) =>
            saved ? api.delete(`/savedJobs/${id}`) : api.post(`/savedJobs/${id}`),
        onMutate: async ({ id, saved }) => {
            await qc.cancelQueries({ queryKey: KEY });
            const prev = qc.getQueryData<string[]>(KEY) ?? [];
            qc.setQueryData<string[]>(KEY, saved ? prev.filter((x) => x !== id) : [...prev, id]);
            return { prev };
        },
        onError: (_e, _v, ctx) => qc.setQueryData(KEY, ctx?.prev ?? []),
        onSettled: () => qc.invalidateQueries({ queryKey: KEY }),
    });
}

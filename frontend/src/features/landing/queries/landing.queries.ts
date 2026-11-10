import {useQuery} from "@tanstack/react-query";
import {categories, companies, jobs, stats} from "./landing.api";

export const useStats = () => {
    return useQuery({
        queryKey: ["state"],
        queryFn: stats,
        retry: false,
    });
};
export const useJobs = () => {
    return useQuery({
        queryKey: ["lendingJobs"],
        queryFn: jobs,
        retry: false,
    });
};
export const useCompany = () => {
    return useQuery({
        queryKey: ["lendingCompany"],
        queryFn: companies,
        retry: false,
    });
};
export const useCategories = () => {
    return useQuery({
        queryKey: ["categories"],
        queryFn: categories,
        retry: false,
    });
};

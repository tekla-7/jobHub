import {JobFilters} from "../types/filter.type";
import {PAGE_SIZE} from "../constants";
import {keepPreviousData, useQuery} from "@tanstack/react-query";
import {fetchCompanyJobs, fetchJob, fetchJobs} from "../api";

export const useJobs=(filters:JobFilters,limit=PAGE_SIZE)=>
    useQuery({
        queryKey:['jobs',filters,limit],
        queryFn:()=>fetchJobs(filters,limit),
        placeholderData:keepPreviousData
    })

export const useJob=(id:string|undefined)=>
    useQuery({
        queryKey: ["job",id],
        queryFn:()=>fetchJob(id as string),
        enabled:!!id
    })
export const useCompanyJobs=(filters:JobFilters,limit=PAGE_SIZE,id:string|undefined)=>
    useQuery({
        queryKey:['companyJobs',filters,limit],
        queryFn:()=>fetchCompanyJobs(filters,limit,id as string),
        placeholderData:keepPreviousData,
        enabled:!!id
    })
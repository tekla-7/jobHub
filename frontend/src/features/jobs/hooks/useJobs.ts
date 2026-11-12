import {JobFilters} from "../types/filter.type";
import {PAGE_SIZE} from "../constants";
import {keepPreviousData, useQuery} from "@tanstack/react-query";
import {fetchJob, fetchJobs} from "../api";

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

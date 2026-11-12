import {SortKey} from "../constants";

export interface JobFilters{
    search:string,
    location:string,
    department:string[],
    employmentType:string[],
    workplaceType:string[],
    skills:string[],
    salaryMin?:number,
    salaryMax?:number,
    sort:SortKey,
    page:number,
}
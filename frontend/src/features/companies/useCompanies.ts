import {CompanyFilters, CreateCompanyBody} from "./type";
import {COMPANIES_PAGE_SIZE} from "./constant";
import {keepPreviousData, useMutation, useQuery, useQueryClient} from "@tanstack/react-query";
import {createCompany, fetchCompanies, fetchCompany} from "./api";
import {useAppDispatch} from "../../store/hooks";
import {addMembership, switchContext} from "../../store/user-slice";

export const useCompanies = (filters: CompanyFilters, limit = COMPANIES_PAGE_SIZE) =>
    useQuery({
        queryKey: ['companies', filters, limit],
        queryFn: () => fetchCompanies(filters, limit),
        placeholderData: keepPreviousData,
    });

export const useCompany = (id?: string) =>
    useQuery({ queryKey: ['company', id], queryFn: () => fetchCompany(id as string), enabled: !!id });
export const useCreateCompany=()=>{
    const dispatch=useAppDispatch();
    const qc=useQueryClient();
    return useMutation({
        mutationFn:(body:CreateCompanyBody)=>createCompany(body),
        onSuccess:((membership)=>{
            dispatch(addMembership(membership));
            dispatch(switchContext(membership.company._id));
            qc.invalidateQueries({queryKey:['companies']})
        })
    });
}
import {CompanyFilters} from "./type";
import {COMPANIES_PAGE_SIZE} from "./constant";
import {keepPreviousData, useQuery} from "@tanstack/react-query";
import {fetchCompanies, fetchCompany} from "./api";

export const useCompanies = (filters: CompanyFilters, limit = COMPANIES_PAGE_SIZE) =>
    useQuery({
        queryKey: ['companies', filters, limit],
        queryFn: () => fetchCompanies(filters, limit),
        placeholderData: keepPreviousData,
    });

export const useCompany = (id?: string) =>
    useQuery({ queryKey: ['company', id], queryFn: () => fetchCompany(id as string), enabled: !!id });

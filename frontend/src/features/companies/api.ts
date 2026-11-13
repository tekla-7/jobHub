import {api} from "../../core/api";
import {CompaniesResponse, Company, CompanyFilters} from "./type";
import {COMPANIES_PAGE_SIZE} from "./constant";

export function fetchCompanies(f: CompanyFilters, pageSize = COMPANIES_PAGE_SIZE): Promise<CompaniesResponse> {
    const params: Record<string, string | number> = { page: f.page,pageSize };
    if (f.search) params.search = f.search;
    if (f.industry) params.industry = f.industry;
    if (f.size) params.size = f.size;
    return api.get<{ data:CompaniesResponse }>('/companies', { params }).then((r) => r.data.data);
}


export const fetchCompany = (id: string) => api.get<{ data:Company }>(`/companies/${id}`).then((r) => r.data.data);

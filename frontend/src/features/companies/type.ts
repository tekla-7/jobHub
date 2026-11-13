export interface Company {
    _id: string;
    name: string;
    logo?: string;
    cover?: string;
    industry?: string;
    size?: string;
    location?: string;
    website?: string;
    description?: string;
    openJobs?: number;
}

export interface CompaniesResponse {
    items: Company[];
    totalCount: number;
    page: number;
    pages: number;
}

export interface CompanyFilters {
    search: string;
    industry: string;
    size: string;
    page: number;
}

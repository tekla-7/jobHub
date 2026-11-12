export interface JobCompany {
    _id: string;
    name: string;
    logo?: string;
    industry?: string;
    size?: string;
    website?: string;
    location?: string;
}

export interface Job {
    _id: string;
    company: JobCompany;
    createdBy?: string;
    title: string;
    description: string;
    location: string;
    department: string;
    employmentType: string;
    workplaceType: string;
    salaryMin?: number;
    salaryMax?: number;
    skills: string[];
    status: string;
    startAt: string;
    endAt: string | null;
    createdAt: string;
    updatedAt: string;
    hasApplied?: boolean;

}

export interface JobsResponse {
    items: Job[];
    totalCount: number;
    pages: number;
    page: number;
}
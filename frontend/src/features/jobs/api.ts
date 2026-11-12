import {api} from "../../core/api";
import {JobFilters} from "./types/filter.type";
import {PAGE_SIZE} from "./constants";
import {Job, JobsResponse} from "./types/job.type";

export function fetchJobs(f: JobFilters, limit = PAGE_SIZE): Promise<JobsResponse> {
    const params: Record<string, string | number> = { page: f.page,pageSize: limit, sort: f.sort };
    if (f.search) params.search = f.search;
    if (f.location) params.location = f.location;
    if (f.department.length) params.department = f.department.join(',');
    if (f.employmentType.length) params.employmentType = f.employmentType.join(',');
    if (f.workplaceType.length) params.workplaceType = f.workplaceType.join(',');
    if (f.skills.length) params.skills = f.skills.join(',');
    if (f.salaryMin != null) params.salaryMin = f.salaryMin;
    if (f.salaryMax != null) params.salaryMax = f.salaryMax;
    return api.get<{data: JobsResponse }>('/jobs', { params }).then((r) => r.data.data);
}
export const fetchJob = (id: string) => api.get<{ data:Job }>(`/jobs/${id}`).then((r) => r.data.data);
export const applyToJob = (id: string, coverNote?: string) =>
    api.post(`/jobs/${id}/applications`, { coverNote }).then((r) => r.data.data);

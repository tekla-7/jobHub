import {JobFilters} from "../types/filter.type";
import {SORT_OPTIONS, SortKey} from "../constants";
import { useSearchParams } from 'react-router-dom';
import {useMemo} from "react";

export const DEFAULT_FILTERS: JobFilters = {
    search: '', location: '',
    department: [],
    employmentType: [],
    workplaceType: [],
    skills: [],
    sort: 'newest',
    page: 1,
}
const list = (v: string | null) => (v ? v.split(',').filter(Boolean) : []);
const num = (v: string | null) => {
    if (!v) return undefined;
    const n = Number(v);
    return Number.isFinite(n) && n >= 0 ? n : undefined;
}

function parse(sp: URLSearchParams): JobFilters {
    const sort = sp.get('sort') as SortKey | null;
    const page = Number(sp.get('page'));
    return {
        search: sp.get('search') ?? '',
        location: sp.get('location') ?? '',
        department: list(sp.get('department')),
        employmentType: list(sp.get('employmentType')),
        workplaceType: list(sp.get('workplaceType')),
        skills: list(sp.get('skills')),
        salaryMin: num(sp.get('salaryMin')),
        salaryMax: num(sp.get('salaryMax')),
        sort: sort && SORT_OPTIONS.some(s => s.value === sort) ? sort : 'newest',
        page: Number.isInteger(page) && page > 0 ? page : 1,
    }
}

function toParams(f: JobFilters): URLSearchParams {
    const p = new URLSearchParams();
    if (f.search) p.set('search', f.search);
    if (f.location) p.set('location', f.location);
    if (f.department.length) p.set('department', f.department.join(','));
    if (f.employmentType.length) p.set('employmentType', f.employmentType.join(','));
    if (f.skills.length) p.set('skills', f.skills.join(','));
    if (f.workplaceType.length) p.set('workplaceType', f.workplaceType.join(','));
    if (f.salaryMin) p.set('salaryMin', String(f.salaryMin));
    if (f.salaryMax) p.set('salaryMax', String(f.salaryMax));
    if (f.sort !== 'newest') p.set('sort', f.sort);
    if (f.page > 1) p.set('page', String(f.page));
    return p;
}
export const countActive = (f: JobFilters) =>
    (f.search ? 1 : 0) + (f.location ? 1 : 0) + f.department.length + f.employmentType.length +
    f.workplaceType.length + f.skills.length + (f.salaryMin != null || f.salaryMax != null ? 1 : 0);

export function useJobFilters() {
    const [sp, setSp] = useSearchParams();
    const filters = useMemo(() => parse(sp), [sp]);

    const setFilters = (patch: Partial<JobFilters>) => {
        const next = { ...filters, ...patch };
        if (!('page' in patch)) next.page = 1;
        setSp(toParams(next), { replace: true });
    };
    const clearFilters = () => setSp(new URLSearchParams(), { replace: true });

    return { filters, setFilters, clearFilters, activeCount: countActive(filters) };
}
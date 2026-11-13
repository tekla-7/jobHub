import { CompanyFilters } from "./type";
import {useSearchParams} from "react-router-dom";
import {useMemo} from "react";

export const DEFAULT_COMPANY_FILTERS: CompanyFilters = { search: '', industry: '', size: '', page: 1 };

function parse(sp: URLSearchParams): CompanyFilters {
    const page = Number(sp.get('page'));
    return {
        search: sp.get('search') ?? '',
        industry: sp.get('industry') ?? '',
        size: sp.get('size') ?? '',
        page: Number.isInteger(page) && page > 0 ? page : 1,
    };
}

function toParams(f: CompanyFilters) {
    const p = new URLSearchParams();
    if (f.search) p.set('search', f.search);
    if (f.industry) p.set('industry', f.industry);
    if (f.size) p.set('size', f.size);
    if (f.page > 1) p.set('page', String(f.page));
    return p;
}

export function useCompanyFilters() {
    const [sp, setSp] = useSearchParams();
    const filters = useMemo(() => parse(sp), [sp]);
    const setFilters = (patch: Partial<CompanyFilters>) => {
        const next = { ...filters, ...patch };
        if (!('page' in patch)) next.page = 1;
        setSp(toParams(next), { replace: true });
    };
    const clearFilters = () => setSp(new URLSearchParams(), { replace: true });
    const activeCount = (filters.search ? 1 : 0) + (filters.industry ? 1 : 0) + (filters.size ? 1 : 0);
    return { filters, setFilters, clearFilters, activeCount };
}

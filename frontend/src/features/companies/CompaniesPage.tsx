import {useCompanies} from "./useCompanies";
import {COMPANY_SIZES, INDUSTRIES, sizeLabel} from "./constant";
import DebouncedInput from "../../shared/components/DebouncedInput";
import CompanyCard, {CompanyCardSkeleton} from "./components/CompanyCard";
import Pagination from "../../shared/components/Pagination";
import {useCompanyFilters} from "./useCompanyFilters";

const selectCls = 'rounded-lg border border-[#E4E7EC] bg-white px-3 py-2.5 text-sm text-[#1E2530] outline-none focus:border-[#28508E]';

export default function CompaniesPage() {
    const { filters, setFilters, clearFilters, activeCount } = useCompanyFilters();
    const { data, isPending, isError, isFetching, refetch } = useCompanies(filters);

    const changePage = (page: number) => {
        setFilters({ page });
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    return (
        <div className="mx-auto max-w-[1160px] px-6 py-8">
            <h1 className="text-2xl font-bold tracking-tight">Companies</h1>
            <p className="mt-1 text-sm text-[#667085]">
                {isPending ? 'Loading companies…' : `${data?.totalCount ?? 0} compan${data?.totalCount === 1 ? 'y' : 'ies'} hiring on JobHub`}
            </p>

            <div className="mt-6 flex flex-wrap items-center gap-3">
                <div className="w-full sm:max-w-[360px]">
                    <DebouncedInput value={filters.search} onCommit={(v) => setFilters({ search: v })} placeholder="Search companies by name" aria-label="Search companies" />
                </div>
                <select value={filters.industry} onChange={(e) => setFilters({ industry: e.target.value })} aria-label="Industry" className={selectCls}>
                    <option value="">All industries</option>
                    {INDUSTRIES.map((i) => <option key={i} value={i}>{i}</option>)}
                </select>
                <select value={filters.size} onChange={(e) => setFilters({ size: e.target.value })} aria-label="Company size" className={selectCls}>
                    <option value="">Any size</option>
                    {COMPANY_SIZES.map((s) => <option key={s} value={s}>{sizeLabel(s)}</option>)}
                </select>
                {activeCount > 0 && (
                    <button type="button" onClick={clearFilters} className="text-[13px] font-semibold text-[#28508E] hover:underline">Clear filters</button>
                )}
            </div>

            <section className="mt-6" aria-live="polite">
                {isError ? (
                    <div className="rounded-[10px] border border-[#E4E7EC] bg-white p-10 text-center">
                        <p className="font-semibold">Couldn't load companies</p>
                        <p className="mt-1 text-sm text-[#667085]">Check your connection and try again.</p>
                        <button type="button" onClick={() => refetch()} className="mt-4 rounded-lg bg-[#28508E] px-4 py-2.5 text-sm font-semibold text-white hover:bg-[#1E3E70]">Retry</button>
                    </div>
                ) : isPending ? (
                    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                        {Array.from({ length: 6 }).map((_, i) => <CompanyCardSkeleton key={i} />)}
                    </div>
                ) : data.items.length === 0 ? (
                    <div className="rounded-[10px] border border-[#E4E7EC] bg-white p-10 text-center">
                        <p className="font-semibold">No companies found</p>
                        <p className="mt-1 text-sm text-[#667085]">Try a different name or remove a filter.</p>
                        {activeCount > 0 && <button type="button" onClick={clearFilters} className="mt-4 rounded-lg border border-[#E4E7EC] bg-white px-4 py-2.5 text-sm font-semibold hover:bg-[#F8F9FB]">Clear filters</button>}
                    </div>
                ) : (
                    <>
                        <div className={`grid gap-4 transition-opacity sm:grid-cols-2 lg:grid-cols-3 ${isFetching ? 'opacity-60' : ''}`}>
                            {data.items.map((c) => <CompanyCard key={c._id} company={c} />)}
                        </div>
                        <Pagination page={data.page} pages={data.pages} onChange={changePage} />
                    </>
                )}
            </section>
        </div>
    );
}

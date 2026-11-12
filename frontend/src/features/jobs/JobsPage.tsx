import {useJobFilters} from "./hooks/useJobFilters";
import React, {useState} from "react";
import {useJobs} from "./hooks/useJobs";
import {SORT_OPTIONS, SortKey} from "./constants";
import JobFilters from "./components/JobFilters";
import JobCard, {JobCardSkeleton} from "./components/JobCard";
import Pagination from "../../shared/components/Pagination";
import ActiveFilters from "./components/ActiveFilters";

export default function JobsPage(){
    const {filters,setFilters,clearFilters,activeCount}=useJobFilters();
    const { data, isPending, isError, isFetching, refetch } = useJobs(filters);
    const [drawer,setDrawer]=useState(false);
    const changePage=(page:number)=>{
        setFilters({page});
        window.scrollTo({top:0,behavior:"smooth"});
    }
    const filterProps={filters,onChange:setFilters,onClear:clearFilters,activeCount };
    console.log(data)
    return (
        <div className="mx-auto max-w-[1160px] px-6 py-8">
            <h1 className="text-2xl font-bold tracking-tight">Jobs</h1>

            <div className="mt-6 grid gap-8 lg:grid-cols-[260px_1fr]">
                <aside className="hidden lg:block" aria-label="Filters">
                    <JobFilters {...filterProps} />
                </aside>

                <section aria-live="polite">
                    <div className="mb-3 flex flex-wrap items-center justify-between gap-3">
                        <p className="text-sm text-[#667085]">
                            {isPending ? 'Loading jobs…' : `${data?.totalCount ?? 0} job${data?.totalCount === 1 ? '' : 's'} found`}
                        </p>
                        <div className="flex items-center gap-2.5">
                            <button
                                type="button"
                                onClick={() => setDrawer(true)}
                                className="rounded-lg border border-[#E4E7EC] bg-white px-3.5 py-2 text-[13px] font-semibold lg:hidden"
                            >
                                Filters{activeCount > 0 ? ` (${activeCount})` : ''}
                            </button>
                            <label className="flex items-center gap-2 text-[13px] text-[#667085]">
                                <span className="sr-only sm:not-sr-only">Sort by</span>
                                <select
                                    value={filters.sort}
                                    onChange={(e) => setFilters({ sort: e.target.value as SortKey })}
                                    className="rounded-lg border border-[#E4E7EC] bg-white px-3 py-2 text-[13px] font-medium text-[#1E2530] outline-none focus:border-[#28508E]"
                                >
                                    {SORT_OPTIONS.map((o) => <option key={o.value} value={o.value}>{o.label}</option>)}
                                </select>
                            </label>
                        </div>
                    </div>

                    <ActiveFilters filters={filters} onChange={setFilters} />

                    {isError ? (
                        <div className="rounded-[10px] border border-[#E4E7EC] bg-white p-10 text-center">
                            <p className="font-semibold">Couldn't load jobs</p>
                            <p className="mt-1 text-sm text-[#667085]">Check your connection and try again.</p>
                            <button type="button" onClick={() => refetch()} className="mt-4 rounded-lg bg-[#28508E] px-4 py-2.5 text-sm font-semibold text-white hover:bg-[#1E3E70]">Retry</button>
                        </div>
                    ) : isPending ? (
                        <div className="divide-y divide-[#E4E7EC] overflow-hidden rounded-[10px] border border-[#E4E7EC] bg-white">
                            {Array.from({ length: 5 }).map((_, i) => <JobCardSkeleton key={i} />)}
                        </div>
                    ) : data.items.length === 0 ? (
                        <div className="rounded-[10px] border border-[#E4E7EC] bg-white p-10 text-center">
                            <p className="font-semibold">No jobs match your filters</p>
                            <p className="mt-1 text-sm text-[#667085]">Try removing a filter or searching for something broader.</p>
                            {activeCount > 0 && (
                                <button type="button" onClick={clearFilters} className="mt-4 rounded-lg border border-[#E4E7EC] bg-white px-4 py-2.5 text-sm font-semibold hover:bg-[#F8F9FB]">Clear filters</button>
                            )}
                        </div>
                    ) : (
                        <>
                            <div className={`divide-y divide-[#E4E7EC] overflow-hidden rounded-[10px] border border-[#E4E7EC] bg-white transition-opacity ${isFetching ? 'opacity-60' : ''}`}>
                                {data.items.map((job) => <JobCard key={job._id} job={job} />)}
                            </div>
                            <Pagination page={data.page} pages={data.pages} onChange={changePage} />
                        </>
                    )}
                </section>
            </div>

            {drawer && (
                <div className="fixed inset-0 z-50 lg:hidden" role="dialog" aria-modal="true" aria-label="Filters">
                    <div className="absolute inset-0 bg-black/40" onClick={() => setDrawer(false)} />
                    <div className="absolute inset-y-0 right-0 w-[min(340px,90vw)] overflow-y-auto bg-white p-5">
                        <div className="mb-4 flex items-center justify-between">
                            <b className="text-base">Filters</b>
                            <button type="button" onClick={() => setDrawer(false)} aria-label="Close filters" className="p-1 text-lg">✕</button>
                        </div>
                        <JobFilters {...filterProps} />
                        <button type="button" onClick={() => setDrawer(false)} className="mt-4 w-full rounded-lg bg-[#28508E] py-3 text-sm font-semibold text-white">
                            Show {data?.totalCount ?? ''} results
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}
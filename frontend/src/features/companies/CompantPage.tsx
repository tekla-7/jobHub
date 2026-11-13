import {Link, useNavigate, useParams} from "react-router-dom";
import {PATHS} from "../../routes/paths";
import {useCompany} from "./useCompanies";
import {useEffect, useState} from "react";
import {DEFAULT_FILTERS} from "../jobs/hooks/useJobFilters";
import {useAppDispatch, useAppSelector} from "../../store/hooks";
import {can} from "../auth/permissions";
import {switchContext} from "../../store/user-slice";
import CompanyMark from "../../shared/components/CompanyMark";
import {sizeLabel, websiteHref} from "./constant";
import Pagination from "../../shared/components/Pagination";
import JobCard, {JobCardSkeleton} from "../jobs/components/JobCard";
import {useCompanyJobs, useJobs} from "../jobs/hooks/useJobs";

function Skeleton() {
    return (
        <div className="mx-auto max-w-[1160px] animate-pulse px-6 py-8" aria-hidden>
            <div className="h-40 rounded-xl bg-[#EEF0F2]" />
            <div className="-mt-10 ml-5 h-20 w-20 rounded-xl border-4 border-[#F8F9FB] bg-[#E4E7EC]" />
            <div className="mt-4 h-6 w-48 rounded bg-[#EEF0F2]" />
            <div className="mt-8 grid gap-8 lg:grid-cols-[1fr_300px]"><div className="space-y-3"><div className="h-4 rounded bg-[#EEF0F2]" /><div className="h-4 w-2/3 rounded bg-[#EEF0F2]" /></div><div className="h-40 rounded-[10px] bg-[#EEF0F2]" /></div>
        </div>
    );
}

function NotFound() {
    return (
        <div className="mx-auto max-w-[520px] px-6 py-20 text-center">
            <h1 className="text-xl font-bold">Company not found</h1>
            <p className="mt-2 text-sm text-[#667085]">It may have been removed or the link is wrong.</p>
            <Link to={PATHS.companies} className="mt-5 inline-flex rounded-lg bg-[#28508E] px-4 py-2.5 text-sm font-semibold text-white hover:bg-[#1E3E70]">Browse companies</Link>
        </div>
    );
}

function Row({ label, children }: { label: string; children: React.ReactNode }) {
    return (
        <div className="py-3">
            <dt className="text-xs text-[#667085]">{label}</dt>
            <dd className="mt-0.5 text-[13.5px] font-semibold text-[#1E2530]">{children}</dd>
        </div>
    );
}

export default function CompanyPage() {
    const { id } = useParams();
    const { data: company, isPending, isError } = useCompany(id);

    const [jobsPage, setJobsPage] = useState(1);
    useEffect(() => setJobsPage(1), [id]);
    const jobs = useCompanyJobs({ ...DEFAULT_FILTERS, page: jobsPage }, 10, id);

    const user = useAppSelector((s) => s.auth.user);
    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    if (isPending) return <Skeleton />;
    if (isError || !company) return <NotFound />;

    const membership = user?.memberships.find((m) => m.company._id === company._id);
    const canEdit = can(membership?.role, 'company.edit');
    const editCompany = () => {
        dispatch(switchContext(company._id));
        navigate(`${PATHS.employer}/company/edit`);
    };

    return (
        <div className="mx-auto max-w-[1160px] px-6 pb-12 pt-8">
            {/* cover + logo */}
            <div
                className="h-36 rounded-xl bg-gradient-to-r from-[#1E3E70] to-[#28508E] bg-cover bg-center md:h-44"
                style={company.cover ? { backgroundImage: `url(${company.cover})` } : undefined}
                role="img"
                aria-label={company.cover ? `${company.name} cover image` : undefined}
            />
            <div className="-mt-10 flex flex-col gap-4 px-2 sm:flex-row sm:items-end sm:px-5">
                <div className="w-fit overflow-hidden rounded-xl border-4 border-[#F8F9FB] bg-white">
                    <CompanyMark name={company.name} logo={company.logo} size={80} />
                </div>
                <div className="min-w-0 flex-1 pb-1">
                    <h1 className="text-2xl font-bold tracking-tight">{company.name}</h1>
                    <p className="mt-1 flex flex-wrap gap-x-4 gap-y-1 text-[13px] text-[#667085]">
                        {company.industry && <span>{company.industry}</span>}
                        {company.size && <span>{sizeLabel(company.size)}</span>}
                        {company.location && <span>{company.location}</span>}
                        {company.website && (
                            <a href={websiteHref(company.website)} target="_blank" rel="noopener noreferrer" className="text-[#28508E] hover:underline">{company.website}</a>
                        )}
                    </p>
                </div>
                {canEdit && (
                    <button type="button" onClick={editCompany} className="rounded-lg bg-[#28508E] px-4 py-2.5 text-sm font-semibold text-white hover:bg-[#1E3E70]">
                        Edit company page
                    </button>
                )}
            </div>

            <div className="mt-10 grid gap-8 lg:grid-cols-[1fr_300px]">
                <div>
                    <section>
                        <h2 className="mb-3 text-[15px] font-bold">About {company.name}</h2>
                        {company.description ? (
                            <p className="whitespace-pre-line text-[14.5px] leading-7 text-[#344054]">{company.description}</p>
                        ) : (
                            <p className="text-sm text-[#667085]">This company hasn't added a description yet.</p>
                        )}
                    </section>

                    <section className="mt-10" aria-live="polite">
                        <h2 className="mb-3 text-xs font-bold uppercase tracking-[0.06em] text-[#667085]">
                            Open positions{jobs.data ? ` (${jobs.data.totalCount})` : ''}
                        </h2>
                        {jobs.isError ? (
                            <p className="rounded-[10px] border border-[#E4E7EC] bg-white p-6 text-sm text-[#667085]">Couldn't load open positions.</p>
                        ) : jobs.isPending ? (
                            <div className="divide-y divide-[#E4E7EC] overflow-hidden rounded-[10px] border border-[#E4E7EC] bg-white">
                                {Array.from({ length: 3 }).map((_, i) => <JobCardSkeleton key={i} />)}
                            </div>
                        ) : jobs.data.items.length === 0 ? (
                            <p className="rounded-[10px] border border-[#E4E7EC] bg-white p-6 text-sm text-[#667085]">No open positions right now.</p>
                        ) : (
                            <>
                                <div className="divide-y divide-[#E4E7EC] overflow-hidden rounded-[10px] border border-[#E4E7EC] bg-white">
                                    {jobs.data.items.map((job) => <JobCard key={job._id} job={job} />)}
                                </div>
                                <Pagination page={jobs.data.page} pages={jobs.data.pages} onChange={setJobsPage} />
                            </>
                        )}
                    </section>
                </div>

                <aside>
                    <dl className="divide-y divide-[#E4E7EC] rounded-[10px] border border-[#E4E7EC] bg-white px-5 py-1">
                        {company.industry && <Row label="Industry">{company.industry}</Row>}
                        {company.size && <Row label="Company size">{sizeLabel(company.size)}</Row>}
                        {company.location && <Row label="Location">{company.location}</Row>}
                        {company.website && (
                            <Row label="Website">
                                <a href={websiteHref(company.website)} target="_blank" rel="noopener noreferrer" className="text-[#28508E] hover:underline">{company.website}</a>
                            </Row>
                        )}
                        <Row label="Open positions">{company.openJobs ?? jobs.data?.totalCount ?? 0}</Row>
                    </dl>
                </aside>
            </div>
        </div>
    );
}

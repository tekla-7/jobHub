import {Link, useLocation, useNavigate, useParams} from "react-router-dom";
import {PATHS} from "../../routes/paths";
import {useAppSelector} from "../../store/hooks";
import {useState} from "react";
import {formatDate, formatSalary, isJobOpen, timeAgo} from "./format";
import CompanyMark from "../../shared/components/CompanyMark";
import {labelOf} from "./constants";
import SaveJobButton from "./components/SaveJobButton";
import ApplyModal from "./components/AppleModel";
import {Job} from "./types/job.type";
import {useJob} from "./hooks/useJobs";

function Skeleton() {
    return (
        <div className="mx-auto max-w-[1160px] animate-pulse px-6 py-8" aria-hidden>
            <div className="h-4 w-40 rounded bg-[#EEF0F2]" />
            <div className="mt-6 flex gap-4"><div className="h-14 w-14 rounded-lg bg-[#EEF0F2]" /><div className="flex-1 space-y-3"><div className="h-6 w-1/3 rounded bg-[#EEF0F2]" /><div className="h-4 w-1/4 rounded bg-[#EEF0F2]" /></div></div>
            <div className="mt-8 grid gap-8 lg:grid-cols-[1fr_300px]"><div className="space-y-3"><div className="h-4 rounded bg-[#EEF0F2]" /><div className="h-4 rounded bg-[#EEF0F2]" /><div className="h-4 w-2/3 rounded bg-[#EEF0F2]" /></div><div className="h-48 rounded-[10px] bg-[#EEF0F2]" /></div>
        </div>
    );
}

function NotFound() {
    return (
        <div className="mx-auto max-w-[520px] px-6 py-20 text-center">
            <h1 className="text-xl font-bold">This job isn't available</h1>
            <p className="mt-2 text-sm text-[#667085]">It may have been removed or the link is wrong.</p>
            <Link to={PATHS.jobs} className="mt-5 inline-flex rounded-lg bg-[#28508E] px-4 py-2.5 text-sm font-semibold text-white hover:bg-[#1E3E70]">Browse all jobs</Link>
        </div>
    );
}

function Row({ label, value }: { label: string; value: string }) {
    return (
        <div className="flex justify-between gap-4 py-2.5 text-[13px]">
            <span className="text-[#667085]">{label}</span>
            <span className="text-right font-semibold text-[#1E2530]">{value}</span>
        </div>
    );
}

export default function JobDetailsPage() {
    const { id } = useParams();
    const { data: job, isPending, isError } = useJob(id);
    const user = useAppSelector((s) => s.auth.user);
    const activeCompanyId = useAppSelector((s) => s.auth.activeCompanyId);
    const navigate = useNavigate();
    const location = useLocation();
    const [applyOpen, setApplyOpen] = useState(false);
    const [justApplied, setJustApplied] = useState(false);

    if (isPending) return <Skeleton />;
    if (isError || !job) return <NotFound />;

    const open = isJobOpen(job);
    const applied = job.hasApplied || justApplied;
    const actingAsCompany = !!activeCompanyId;

    const onApply = () => {
        if (!user) return navigate(PATHS.login, { state: { from: location } });
        setApplyOpen(true);
    };

    const ApplyButton = ({ full }: { full?: boolean }) => {
        const base = `rounded-lg px-5 py-2.5 text-sm font-semibold ${full ? 'flex-1' : ''}`;
        if (!open) return <button disabled className={`${base} cursor-not-allowed bg-[#EEF0F2] text-[#667085]`}>Applications closed</button>;
        if (applied) return <button disabled className={`${base} cursor-default border border-[#E4E7EC] bg-white text-[#12805C]`}>Applied ✓</button>;
        if (actingAsCompany) return <button disabled className={`${base} cursor-not-allowed bg-[#EEF0F2] text-[#667085]`}>Apply</button>;
        return <button onClick={onApply} className={`${base} bg-[#28508E] text-white hover:bg-[#1E3E70]`}>Apply now</button>;
    };

    return (
        <div className="mx-auto max-w-[1160px] px-6 pb-28 pt-8 lg:pb-12">
            <nav aria-label="Breadcrumb" className="text-[13px] text-[#667085]">
                <Link to={PATHS.jobs} className="hover:text-[#28508E]">Jobs</Link> / <span className="text-[#1E2530]">{job.title}</span>
            </nav>

            {!open && (
                <div role="status" className="mt-5 rounded-lg border border-[#FDE2B0] bg-[#FDF1DF] px-4 py-3 text-[13.5px] text-[#B26A00]">
                    This position is no longer accepting applications.
                </div>
            )}
            <header className="mt-6 flex flex-col gap-5 sm:flex-row sm:items-start">
                <CompanyMark name={job.company.name} logo={job.company.logo} size={56} />
                <div className="min-w-0 flex-1">
                    <h1 className="text-2xl font-bold tracking-tight">{job.title}</h1>
                    <p className="mt-1 text-[15px] text-[#667085]">
                        <Link to={`${PATHS.companies}/${job.company._id}`} className="font-semibold text-[#1E2530] hover:text-[#28508E]">{job.company.name}</Link>
                        {job.company.industry ? ` · ${job.company.industry}` : ''}
                    </p>
                    <ul className="mt-3 flex flex-wrap gap-x-5 gap-y-1.5 text-[13px] text-[#667085]">
                        <li>{job.location} · {labelOf(job.workplaceType)}</li>
                        <li>{labelOf(job.employmentType)}</li>
                        <li className="font-semibold text-[#1E2530]">{formatSalary(job.salaryMin, job.salaryMax)}</li>
                        <li>Posted {timeAgo(job.startAt || job.createdAt)}</li>
                    </ul>
                </div>
                <div className="hidden items-center gap-2.5 lg:flex">
                    <SaveJobButton disabled={actingAsCompany} jobId={actingAsCompany?'':job._id} variant="button" />
                    <ApplyButton />
                </div>
            </header>
            {actingAsCompany && open && !applied && (
                <p className="mt-3 text-right text-xs text-[#667085]">You're using a company account. Switch to your personal account to apply.</p>
            )}

            <div className="mt-8 grid gap-8 lg:grid-cols-[1fr_300px]">
                <div>
                    <section>
                        <h2 className="mb-3 text-[15px] font-bold">About the role</h2>
                        <p className="whitespace-pre-line text-[14.5px] leading-7 text-[#344054]">{job.description}</p>
                    </section>

                    {job.skills.length > 0 && (
                        <section className="mt-8">
                            <h2 className="mb-3 text-[15px] font-bold">Skills</h2>
                            <div className="flex flex-wrap gap-2">
                                {job.skills.map((s) => (
                                    <Link key={s} to={`${PATHS.jobs}?skills=${encodeURIComponent(s)}`} className="rounded-[5px] bg-[#EEF0F2] px-3 py-1.5 text-[12.5px] font-semibold text-[#667085] hover:bg-[#E9EEF7] hover:text-[#1E3E70]">
                                        {s}
                                    </Link>
                                ))}
                            </div>
                        </section>
                    )}
                </div>

                <aside className="space-y-4">
                    <JobOverview job={job} />
                    <CompanyCard job={job} />
                </aside>
            </div>

            <div className="fixed inset-x-0 bottom-0 z-30 flex items-center gap-2.5 border-t border-[#E4E7EC] bg-white p-3 lg:hidden">
                <SaveJobButton jobId={actingAsCompany?'':job._id} disabled={actingAsCompany}  variant="button" />
                <ApplyButton full />
            </div>

            <ApplyModal job={job} open={applyOpen} onClose={() => setApplyOpen(false)} onApplied={() => { setApplyOpen(false); setJustApplied(true); }} />
        </div>
    );
}

function JobOverview({ job }: { job: Job }) {
    return (
        <div className="divide-y divide-[#E4E7EC] rounded-[10px] border border-[#E4E7EC] bg-white px-5 py-2">
            <Row label="Department" value={labelOf(job.department)} />
            <Row label="Employment" value={labelOf(job.employmentType)} />
            <Row label="Workplace" value={labelOf(job.workplaceType)} />
            <Row label="Location" value={job.location} />
            <Row label="Salary" value={formatSalary(job.salaryMin, job.salaryMax)} />
            <Row label="Posted" value={formatDate(job.startAt || job.createdAt)} />
            {job.endAt && <Row label="Apply by" value={formatDate(job.endAt)} />}
        </div>
    );
}

function CompanyCard({ job }: { job: Job }) {
    const c = job.company;
    return (
        <div className="rounded-[10px] border border-[#E4E7EC] bg-white p-5">
            <div className="flex items-center gap-3">
                <CompanyMark name={c.name} logo={c.logo} size={44} />
                <div className="min-w-0">
                    <b className="block truncate text-sm">{c.name}</b>
                    {c.industry && <span className="text-xs text-[#667085]">{c.industry}</span>}
                </div>
            </div>
            {(c.size || c.location || c.website) && (
                <dl className="mt-4 space-y-1.5 text-[13px] text-[#667085]">
                    {c.size && <div>{c.size}</div>}
                    {c.location && <div>{c.location}</div>}
                    {c.website && <a href={c.website.startsWith('http') ? c.website : `https://${c.website}`} target="_blank" rel="noopener noreferrer" className="block text-[#28508E] hover:underline">{c.website}</a>}
                </dl>
            )}
            <Link to={`${PATHS.companies}/${c._id}`} className="mt-4 flex w-full justify-center rounded-lg border border-[#E4E7EC] bg-white py-2.5 text-[13px] font-semibold hover:bg-[#F8F9FB]">
                View company profile
            </Link>
        </div>
    );
}

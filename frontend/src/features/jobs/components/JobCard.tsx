import CompanyMark from "../../../shared/components/CompanyMark";
import React from "react";
import {PATHS} from "../../../routes/paths";
import {Link} from "react-router-dom";
import {Job} from "../types/job.type";
import {labelOf} from "../constants";
import {formatSalary, timeAgo} from "../format";
import SaveJobButton from "./SaveJobButton";
import {useAppSelector} from "../../../store/hooks";

export default function JobCard({ job }: { job: Job }) {
    const activeCompanyId = useAppSelector((s) => s.auth.activeCompanyId);
    const actingAsCompany = !!activeCompanyId;
    return (
        <article className="relative flex gap-4 p-[18px] transition-colors hover:bg-[#F8F9FB]">
            <CompanyMark name={job.company.name} logo={job.company.logo} />
            <div className="min-w-0 flex-1">
                <div className="flex items-start justify-between gap-4">
                    <div className="min-w-0">
                        <h3 className="truncate text-[15px] font-bold text-[#1E2530]">
                            <Link to={`${PATHS.jobs}/${job._id}`} className="after:absolute after:inset-0">{job.title}</Link>
                        </h3>
                        <p className="mt-0.5 text-[13px] text-[#667085]">
                            {job.company.name} · {job.location} · {labelOf(job.workplaceType)}
                        </p>
                    </div>
                    <div className="relative z-10 flex shrink-0 items-start gap-1.5">
                        <div className="text-right">
                            <b className="text-sm text-[#1E2530]">{formatSalary(job.salaryMin, job.salaryMax)}</b>
                            <p className="mt-0.5 text-xs text-[#667085]">{timeAgo(job.startAt || job.createdAt)}</p>
                        </div>
                        <SaveJobButton disabled={actingAsCompany} jobId={actingAsCompany?'':job._id}/>
                    </div>
                </div>
                <div className="mt-2.5 flex flex-wrap gap-1.5">
                    <span className="rounded-[5px] bg-[#E9EEF7] px-2.5 py-1 text-[11.5px] font-semibold text-[#1E3E70]">{labelOf(job.employmentType)}</span>
                    {job.skills.slice(0, 4).map((s) => (
                        <span key={s} className="rounded-[5px] bg-[#EEF0F2] px-2.5 py-1 text-[11.5px] font-semibold text-[#667085]">{s}</span>
                    ))}
                    {job.skills.length > 4 && <span className="px-1 py-1 text-[11.5px] font-semibold text-[#667085]">+{job.skills.length - 4}</span>}
                </div>
            </div>
        </article>
    );
}

export function JobCardSkeleton() {
    return (
        <div className="flex animate-pulse gap-4 p-[18px]" aria-hidden>
            <div className="h-[42px] w-[42px] shrink-0 rounded-lg bg-[#EEF0F2]" />
            <div className="flex-1 space-y-2.5">
                <div className="h-4 w-1/3 rounded bg-[#EEF0F2]" />
                <div className="h-3 w-1/2 rounded bg-[#EEF0F2]" />
                <div className="flex gap-1.5 pt-1"><div className="h-5 w-16 rounded bg-[#EEF0F2]" /><div className="h-5 w-14 rounded bg-[#EEF0F2]" /><div className="h-5 w-14 rounded bg-[#EEF0F2]" /></div>
            </div>
        </div>
    );
}

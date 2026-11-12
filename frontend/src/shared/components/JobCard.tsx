import {Link} from "react-router-dom";
import {PATHS} from "../../routes/paths";
import CompanyMark from "./CompanyMark";
import {Job} from "../types/job.type";


export default function JobCard({ job }: { job: Job }) {
    return (
        <Link to={`${PATHS.jobs}/${job._id}`} className="flex gap-4 p-[18px] transition-colors hover:bg-[#F8F9FB]">
            <CompanyMark name={job.company.name} logo={job.company.logo} />
            <div className="min-w-0 flex-1">
                <div className="flex items-start justify-between gap-4">
                    <div className="min-w-0">
                        <h3 className="truncate text-[15px] font-bold text-[#1E2530]">{job.title}</h3>
                        <p className="mt-0.5 text-[13px] text-[#667085]">{job.company.name} · {job.location} · {job.workplaceType}</p>
                    </div>
                    <div className="shrink-0 text-right">
                        <b className="text-sm text-[#1E2530]">{job.salary}</b>
                        <p className="mt-0.5 text-xs text-[#667085]">{job.postedAt}</p>
                    </div>
                </div>
                <div className="mt-2.5 flex flex-wrap gap-1.5">
                    <span className="rounded-[5px] bg-[#E9EEF7] px-2.5 py-1 text-[11.5px] font-semibold text-[#1E3E70]">{job.type||'-'}</span>
                    {job.skills.map((s) => (
                        <span key={s} className="rounded-[5px] bg-[#EEF0F2] px-2.5 py-1 text-[11.5px] font-semibold text-[#667085]">{s}</span>
                    ))}
                </div>
            </div>
        </Link>
    );
}

import {PATHS} from "../../../routes/paths";
import CompanyMark from "../../../shared/components/CompanyMark";
import {Link} from "react-router-dom";
import {sizeLabel} from "../constant";
import {Company} from "../type";

export default function CompanyCard({ company: c }: { company: Company }) {
    const open = c.openJobs ?? 0;
    return (
        <Link
            to={`${PATHS.companies}/${c._id}`}
            className="flex flex-col rounded-[10px] border border-[#E4E7EC] bg-white p-5 transition-colors hover:border-[#28508E]"
        >
            <CompanyMark name={c.name} logo={c.logo} size={48} />
            <h3 className="mt-3 truncate text-[15px] font-bold text-[#1E2530]">{c.name}</h3>
            <p className="mt-0.5 truncate text-[13px] text-[#667085]">{[c.industry, c.location].filter(Boolean).join(' · ') || ' '}</p>
            <div className="mt-4 flex items-center justify-between gap-2 text-xs">
                <span className="truncate text-[#667085]">{c.size ? sizeLabel(c.size) : ''}</span>
                <span className={`shrink-0 rounded-full px-2.5 py-1 font-semibold ${open > 0 ? 'bg-[#E9EEF7] text-[#1E3E70]' : 'bg-[#EEF0F2] text-[#667085]'}`}>
          {open > 0 ? `${open} open ${open === 1 ? 'role' : 'roles'}` : 'No open roles'}
        </span>
            </div>
        </Link>
    );
}

export function CompanyCardSkeleton() {
    return (
        <div className="animate-pulse rounded-[10px] border border-[#E4E7EC] bg-white p-5" aria-hidden>
            <div className="h-12 w-12 rounded-lg bg-[#EEF0F2]" />
            <div className="mt-3 h-4 w-2/3 rounded bg-[#EEF0F2]" />
            <div className="mt-2 h-3 w-1/2 rounded bg-[#EEF0F2]" />
            <div className="mt-5 flex justify-between"><div className="h-3 w-20 rounded bg-[#EEF0F2]" /><div className="h-5 w-20 rounded-full bg-[#EEF0F2]" /></div>
        </div>
    );
}
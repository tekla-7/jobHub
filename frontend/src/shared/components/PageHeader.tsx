import {ReactNode} from "react";

export default function PageHeader({ title, subtitle, action }: { title: string; subtitle?: string; action?: ReactNode }) {
    return (
        <div className="mb-6 flex flex-wrap items-start justify-between gap-3">
            <div>
                <h1 className="text-[22px] font-bold tracking-tight text-[#1E2530]">{title}</h1>
                {subtitle && <p className="mt-1 text-sm text-[#667085]">{subtitle}</p>}
            </div>
            {action}
        </div>
    );
}

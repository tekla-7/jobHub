import {Link} from "react-router-dom";
import {ReactNode} from "react";

interface Props { title: string; action?: { label: string; to: string }; children: ReactNode ,id?: string }

export default function Section({ title, action, children, id=''}: Props) {
    return (
        <section className="mx-auto max-w-[1160px] px-6 pt-14" id={id}>
            <div className="mb-4 flex items-end justify-between">
                <h2 className="text-xs font-bold uppercase tracking-[0.06em] text-[#667085]">{title}</h2>
                {action && <Link to={action.to} className="text-[13px] font-semibold text-[#28508E] hover:underline">{action.label} →</Link>}
            </div>
            {children}
        </section>
    );
}
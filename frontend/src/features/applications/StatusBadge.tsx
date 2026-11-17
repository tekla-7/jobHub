import {ApplicationStatus} from "./types";
import {STATUS_LABEL, STATUS_STYLE} from "./constants";

export default function StatusBadge({ status }: { status: ApplicationStatus }) {
    return <span className={`inline-flex rounded-[5px] px-2.5 py-1 text-[11px] font-bold uppercase tracking-wide ${STATUS_STYLE[status]}`}>{STATUS_LABEL[status]}</span>;
}

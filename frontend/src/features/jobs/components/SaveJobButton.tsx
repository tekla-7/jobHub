import {useAppSelector} from "../../../store/hooks";
import {useLocation, useNavigate} from "react-router-dom";
import {PATHS} from "../../../routes/paths";
import {useSavedJobs, useToggleSaveJob} from "../hooks/useSavedJobs";
import {MouseEvent} from "react";

interface Props { jobId: string; variant?: 'icon' | 'button',disabled?: boolean }

export default function SaveJobButton({ jobId, variant = 'icon' ,disabled=false}: Props) {
    const user = useAppSelector((s) => s.auth.user);
    const navigate = useNavigate();
    const location = useLocation();
    const { data: savedIds = [] } = useSavedJobs();
    const toggle = useToggleSaveJob();
    const saved = savedIds.includes(jobId);


    const onClick = (e: MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        e.stopPropagation();
        if (!user) return navigate(PATHS.login, { state: { from: location } });
        toggle.mutate({ id: jobId, saved });
    };

    const icon = (
        <svg width="18" height="18" viewBox="0 0 24 24" fill={saved ? '#28508E' : 'none'} stroke="#28508E" strokeWidth="2" strokeLinejoin="round">
            <path d="M6 3h12a1 1 0 0 1 1 1v17l-7-4-7 4V4a1 1 0 0 1 1-1z" />
        </svg>
    );

    if (variant === 'icon') {
        return (
            <button type="button"  disabled={disabled} onClick={onClick} aria-pressed={saved} aria-label={saved ? 'Remove from saved jobs' : 'Save job'} className="rounded-lg p-1.5 hover:bg-[#E9EEF7]">
                {icon}
            </button>
        );
    }
    return (
        <button
            type="button"
            onClick={onClick}
            aria-pressed={saved}
            disabled={disabled}
            className="inline-flex items-center justify-center gap-2 rounded-lg border border-[#E4E7EC] bg-white px-4 py-2.5 text-sm font-semibold text-[#1E2530] hover:bg-[#F8F9FB]"
        >
            {icon}
            {saved ? 'Saved' : 'Save'}
        </button>
    );
}

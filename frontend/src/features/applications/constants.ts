import {ApplicationStatus} from "./types";

export const STATUS_FLOW: ApplicationStatus[] = ['applied', 'reviewing', 'interview', 'hired'];

export const STATUS_LABEL: Record<ApplicationStatus, string> = {
    applied: 'Applied', reviewing: 'Reviewing', interview: 'Interview', hired: 'Hired', rejected: 'Rejected',
};

export const STATUS_STYLE: Record<ApplicationStatus, string> = {
    applied: 'bg-[#EEF0F2] text-[#667085]',
    reviewing: 'bg-[#FDF1DF] text-[#B26A00]',
    interview: 'bg-[#E3EDF9] text-[#2563AC]',
    hired: 'bg-[#E3F5EC] text-[#12805C]',
    rejected: 'bg-[#FBE7E4] text-[#C0392B]',
};

export const canWithdraw = (s: ApplicationStatus) => s === 'applied' || s === 'reviewing' || s === 'interview';

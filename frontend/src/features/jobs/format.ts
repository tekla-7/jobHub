import {Job} from "./types/job.type";
import {OPEN_JOB_STATUS} from "./constants";

const num = new Intl.NumberFormat('en-US');

export function formatSalary(min?: number, max?: number): string {
    if (min == null && max == null) return 'Salary not disclosed';
    if (min != null && max != null) return `₾${num.format(min)} – ₾${num.format(max)}`;
    if (min != null) return `From ₾${num.format(min)}`;
    return `Up to ₾${num.format(max as number)}`;
}

export const formatDate = (iso: string) =>
    new Date(iso).toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' });

export function timeAgo(iso: string): string {
    const mins = Math.floor((Date.now() - new Date(iso).getTime()) / 60000);
    if (mins < 1) return 'Just now';
    if (mins < 60) return `${mins} min ago`;
    const hours = Math.floor(mins / 60);
    if (hours < 24) return `${hours} hour${hours === 1 ? '' : 's'} ago`;
    const days = Math.floor(hours / 24);
    if (days < 7) return `${days} day${days === 1 ? '' : 's'} ago`;
    const weeks = Math.floor(days / 7);
    if (weeks < 5) return `${weeks} week${weeks === 1 ? '' : 's'} ago`;
    return formatDate(iso);
}

export function isJobOpen(job: Job): boolean {
    if (job.status !== OPEN_JOB_STATUS) return false;
    return !job.endAt || new Date(job.endAt).getTime() > Date.now();
}

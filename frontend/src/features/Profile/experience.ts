import {Experience} from "./type";

const monthIndex = (ym: string) => {
    const [y, m] = ym.split('-').map(Number);
    return y * 12 + (m - 1);
};
const nowIndex = () => {
    const d = new Date();
    return d.getFullYear() * 12 + d.getMonth();
};

export function totalMonths(list: Experience[]): number {
    const spans = list
        .filter((e) => /^\d{4}-\d{2}$/.test(e.startDate))
        .map((e) => [monthIndex(e.startDate), e.endDate ? monthIndex(e.endDate) : nowIndex()] as [number, number])
        .filter(([s, e]) => e >= s)
        .sort((a, b) => a[0] - b[0]);

    let total = 0;
    let cur: [number, number] | null = null;
    for (const span of spans) {
        if (!cur) cur = [...span];
        else if (span[0] <= cur[1]) cur[1] = Math.max(cur[1], span[1]);
        else { total += cur[1] - cur[0]; cur = [...span]; }
    }
    if (cur) total += cur[1] - cur[0];
    return total;
}

export function formatDuration(months: number): string {
    if (months < 1) return 'Less than a month';
    const y = Math.floor(months / 12);
    const m = months % 12;
    const years = y ? `${y} yr${y > 1 ? 's' : ''}` : '';
    const mos = m ? `${m} mo${m > 1 ? 's' : ''}` : '';
    return [years, mos].filter(Boolean).join(' ');
}

export const formatMonth = (ym: string) =>
    new Date(`${ym}-01T00:00:00`).toLocaleDateString('en-GB', { month: 'short', year: 'numeric' });

export const formatRange = (start: string, end: string | null) => `${formatMonth(start)} – ${end ? formatMonth(end) : 'Present'}`;

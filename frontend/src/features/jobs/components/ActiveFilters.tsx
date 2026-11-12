import {JobFilters} from "../types/filter.type";
import {labelOf} from "../constants";

interface Chip { key: string; label: string; remove: Partial<JobFilters> }

export default function ActiveFilters({ filters: f, onChange }: { filters: JobFilters; onChange: (p: Partial<JobFilters>) => void }) {
    const chips: Chip[] = [];
    if (f.search) chips.push({ key: 'q', label: `“${f.search}”`, remove: { search: '' } });
    if (f.location) chips.push({ key: 'loc', label: f.location, remove: { location: '' } });
    f.employmentType.forEach((v) => chips.push({ key: `et-${v}`, label: labelOf(v), remove: { employmentType: f.employmentType.filter((x) => x !== v) } }));
    f.workplaceType.forEach((v) => chips.push({ key: `wt-${v}`, label: labelOf(v), remove: { workplaceType: f.workplaceType.filter((x) => x !== v) } }));
    f.department.forEach((v) => chips.push({ key: `d-${v}`, label: labelOf(v), remove: { department: f.department.filter((x) => x !== v) } }));
    f.skills.forEach((v) => chips.push({ key: `s-${v}`, label: v, remove: { skills: f.skills.filter((x) => x !== v) } }));
    if (f.salaryMin != null || f.salaryMax != null) {
        chips.push({ key: 'sal', label: `₾${f.salaryMin ?? 0} – ${f.salaryMax != null ? `₾${f.salaryMax}` : 'any'}`, remove: { salaryMin: undefined, salaryMax: undefined } });
    }
    if (!chips.length) return null;

    return (
        <div className="mb-3 flex flex-wrap gap-2">
            {chips.map((c) => (
                <button
                    key={c.key}
                    type="button"
                    onClick={() => onChange(c.remove)}
                    aria-label={`Remove filter ${c.label}`}
                    className="inline-flex items-center gap-1.5 rounded-full border border-[#E4E7EC] bg-white px-3 py-1 text-[12.5px] font-medium text-[#1E2530] hover:border-[#28508E]"
                >
                    {c.label} <span className="text-[#667085]">✕</span>
                </button>
            ))}
        </div>
    );
}

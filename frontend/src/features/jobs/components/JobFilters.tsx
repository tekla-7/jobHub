import type { JobFilters as Filters } from '../types/filter.type'
import React, {KeyboardEvent,useEffect, useState} from "react";
import {DEPARTMENTS, EMPLOYMENT_TYPES, labelOf, WORKPLACE_TYPES} from "../constants";

interface Props {
    filters: Filters;
    onChange: (patch: Partial<Filters>) => void;
    onClear: () => void;
    activeCount: number;
}

const inputCls = 'w-full rounded-lg border border-[#E4E7EC] bg-white px-3 py-2.5 text-sm text-[#1E2530] outline-none placeholder:text-[#98A2B3] focus:border-[#28508E] focus:ring-[3px] focus:ring-[#E9EEF7]';
const legendCls = 'mb-2 text-[11px] font-bold uppercase tracking-wider text-[#667085]';

function DebouncedInput({ value, onCommit, ...rest }: { value: string; onCommit: (v: string) => void } & Omit<React.InputHTMLAttributes<HTMLInputElement>, 'value' | 'onChange'>) {
    const [v, setV] = useState(value);
    useEffect(() => setV(value), [value]);
    useEffect(() => {
        if (v === value) return;
        const t = setTimeout(() => onCommit(v), 400);
        return () => clearTimeout(t);
    }, [v]);
    return <input {...rest} value={v} onChange={(e) => setV(e.target.value)} className={inputCls} />;
}

function CheckGroup({ title, options, values, onChange }: { title: string; options: readonly string[]; values: string[]; onChange: (v: string[]) => void }) {
    const toggle = (o: string) => onChange(values.includes(o) ? values.filter((x) => x !== o) : [...values, o]);
    return (
        <fieldset className="mb-5">
            <legend className={legendCls}>{title}</legend>
            {options.map((o) => (
                <label key={o} className="flex cursor-pointer items-center gap-2 py-1 text-sm text-[#1E2530]">
                    <input type="checkbox" checked={values.includes(o)} onChange={() => toggle(o)} className="h-4 w-4 accent-[#28508E]" />
                    {labelOf(o)}
                </label>
            ))}
        </fieldset>
    );
}

function SkillsInput({ values, onChange }: { values: string[]; onChange: (v: string[]) => void }) {
    const [draft, setDraft] = useState('');
    const add = () => {
        const v = draft.trim();
        if (v && !values.some((x) => x.toLowerCase() === v.toLowerCase())) onChange([...values, v]);
        setDraft('');
    };
    const onKey = (e: KeyboardEvent<HTMLInputElement>) => { if (e.key === 'Enter') { e.preventDefault(); add(); } };
    return (
        <div>
            {values.length > 0 && (
                <div className="mb-2 flex flex-wrap gap-1.5">
                    {values.map((s) => (
                        <span key={s} className="inline-flex items-center gap-1.5 rounded-[5px] bg-[#E9EEF7] px-2.5 py-1 text-[11.5px] font-semibold text-[#1E3E70]">
              {s}
                            <button type="button" aria-label={`Remove ${s}`} onClick={() => onChange(values.filter((x) => x !== s))}>✕</button>
            </span>
                    ))}
                </div>
            )}
            <input value={draft} onChange={(e) => setDraft(e.target.value)} onKeyDown={onKey} onBlur={add} placeholder="Type a skill, press Enter" className={inputCls} />
        </div>
    );
}

export default function JobFilters({ filters, onChange, onClear, activeCount }: Props) {
    return (
        <div>
            <div className="mb-5">
                <p className={legendCls}>Search</p>
                <DebouncedInput value={filters.search} onCommit={(v) => onChange({ search: v })} placeholder="Title, skill, company" aria-label="Search" />
            </div>
            <div className="mb-5">
                <p className={legendCls}>Location</p>
                <DebouncedInput value={filters.location} onCommit={(v) => onChange({ location: v })} placeholder="e.g. Tbilisi" aria-label="Location" />
            </div>

            <CheckGroup title="Employment type" options={EMPLOYMENT_TYPES} values={filters.employmentType} onChange={(v) => onChange({ employmentType: v })} />
            <CheckGroup title="Workplace" options={WORKPLACE_TYPES} values={filters.workplaceType} onChange={(v) => onChange({ workplaceType: v })} />
            <CheckGroup title="Department" options={DEPARTMENTS} values={filters.department} onChange={(v) => onChange({ department: v })} />

            <div className="mb-5">
                <p className={legendCls}>Salary (₾ / month)</p>
                <div className="grid grid-cols-2 gap-2">
                    <DebouncedInput type="number" min={0} value={filters.salaryMin?.toString() ?? ''} onCommit={(v) => onChange({ salaryMin: v === '' ? undefined : Math.max(0, Number(v)) })} placeholder="Min" aria-label="Minimum salary" />
                    <DebouncedInput type="number" min={0} value={filters.salaryMax?.toString() ?? ''} onCommit={(v) => onChange({ salaryMax: v === '' ? undefined : Math.max(0, Number(v)) })} placeholder="Max" aria-label="Maximum salary" />
                </div>
            </div>

            <div className="mb-6">
                <p className={legendCls}>Skills</p>
                <SkillsInput values={filters.skills} onChange={(v) => onChange({ skills: v })} />
            </div>

            <button
                type="button"
                onClick={onClear}
                disabled={activeCount === 0}
                className="w-full rounded-lg border border-[#E4E7EC] bg-white py-2.5 text-[13px] font-semibold text-[#1E2530] hover:bg-[#F8F9FB] disabled:cursor-not-allowed disabled:opacity-50"
            >
                Clear all filters{activeCount > 0 ? ` (${activeCount})` : ''}
            </button>
        </div>
    );
}

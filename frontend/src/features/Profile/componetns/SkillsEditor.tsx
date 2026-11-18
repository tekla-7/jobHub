import { KeyboardEvent, useState } from 'react';

export default function SkillsEditor({ value, onChange }: { value: string[]; onChange: (v: string[]) => void }) {
    const [draft, setDraft] = useState('');
    const add = () => {
        const v = draft.trim();
        if (v && !value.some((x) => x.toLowerCase() === v.toLowerCase())) onChange([...value, v]);
        setDraft('');
    };
    const onKey = (e: KeyboardEvent<HTMLInputElement>) => { if (e.key === 'Enter') { e.preventDefault(); add(); } };

    return (
        <div>
            {value.length > 0 && (
                <div className="mb-3 flex flex-wrap gap-1.5">
                    {value.map((s) => (
                        <span key={s} className="inline-flex items-center gap-1.5 rounded-[5px] bg-[#E9EEF7] px-2.5 py-1 text-[12px] font-semibold text-[#1E3E70]">
              {s}
                            <button type="button" aria-label={`Remove ${s}`} onClick={() => onChange(value.filter((x) => x !== s))}>✕</button>
            </span>
                    ))}
                </div>
            )}
            <div className="flex gap-2">
                <input
                    value={draft}
                    onChange={(e) => setDraft(e.target.value)}
                    onKeyDown={onKey}
                    placeholder="Add a skill, e.g. React"
                    aria-label="Add a skill"
                    className="w-full rounded-lg border border-[#E4E7EC] bg-white px-3 py-2.5 text-sm outline-none focus:border-[#28508E] focus:ring-[3px] focus:ring-[#E9EEF7]"
                />
                <button type="button" onClick={add} className="rounded-lg border border-[#E4E7EC] bg-white px-4 text-sm font-semibold hover:bg-[#F8F9FB]">Add</button>
            </div>
        </div>
    );
}

import Section from "./Section";
import {useStats} from "../queries/landing.queries";

export default function StatsRow() {
    const {data:STATS=[], isLoading, isError} = useStats();

    return (
        <Section title="JobHub in numbers">
            <div className="grid grid-cols-2 overflow-hidden rounded-[10px] border border-[#E4E7EC] bg-white md:grid-cols-4">
                {STATS.map((s, i) => (
                    <div key={s.label} className={`p-6 ${i > 0 ? 'md:border-l md:border-[#E4E7EC]' : ''} ${i % 2 === 1 ? 'border-l border-[#E4E7EC] md:border-l' : ''} ${i > 1 ? 'border-t border-[#E4E7EC] md:border-t-0' : ''}`}>
                        <b className="block text-[28px] font-bold text-[#1E2530]">{s.value}</b>
                        <span className="text-[13px] text-[#667085]">{s.label}</span>
                    </div>
                ))}
            </div>
        </Section>
    );
}

import {STEPS} from "../data";
import Section from "../../landing/components/Section";

export default function Steps() {
    return (
        <Section title="How it works" id="how-it-works">
            <ol className="grid gap-4 md:grid-cols-3">
                {STEPS.map((s, i) => (
                    <li key={s.title} className="rounded-[10px] border border-[#E4E7EC] bg-white p-6">
                        <span className="flex h-8 w-8 items-center justify-center rounded-full bg-[#E9EEF7] text-sm font-bold text-[#1E3E70]">{i + 1}</span>
                        <h3 className="mt-4 text-[15px] font-bold text-[#1E2530]">{s.title}</h3>
                        <p className="mt-2 text-[13.5px] leading-6 text-[#667085]">{s.text}</p>
                    </li>
                ))}
            </ol>
        </Section>
    );
}

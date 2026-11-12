import Section from "../../landing/components/Section";
import {FAQ} from "../data";

export default function Faq() {
    return (
        <Section title="Questions">
            <div className="divide-y divide-[#E4E7EC] overflow-hidden rounded-[10px] border border-[#E4E7EC] bg-white">
                {FAQ.map((f) => (
                    <details key={f.q} className="group px-5 py-4">
                        <summary className="flex cursor-pointer list-none items-center justify-between gap-4 text-[14.5px] font-semibold text-[#1E2530]">
                            {f.q}
                            <span className="text-lg text-[#667085] transition-transform group-open:rotate-45" aria-hidden>+</span>
                        </summary>
                        <p className="mt-3 max-w-[680px] text-[13.5px] leading-6 text-[#667085]">{f.a}</p>
                    </details>
                ))}
            </div>
        </Section>
    );
}

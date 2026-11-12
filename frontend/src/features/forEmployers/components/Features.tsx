import {FEATURES} from "../data";
import Section from "../../landing/components/Section";

export default function Features() {
    return (
        <Section title="Everything you need to hire">
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {FEATURES.map((f) => (
                    <div key={f.title} className="rounded-[10px] border border-[#E4E7EC] bg-white p-6">
            <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-[#E9EEF7]">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#28508E" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
                <path d={f.icon} />
              </svg>
            </span>
                        <h3 className="mt-4 text-[15px] font-bold text-[#1E2530]">{f.title}</h3>
                        <p className="mt-2 text-[13.5px] leading-6 text-[#667085]">{f.text}</p>
                    </div>
                ))}
            </div>
        </Section>
    );
}

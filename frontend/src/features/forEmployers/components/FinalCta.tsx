import {useEmployerCta} from "../useEmployerCta";
import {Link} from "react-router-dom";

export default function FinalCta() {
    const cta = useEmployerCta();
    return (
        <section className="mx-auto max-w-[1160px] px-6 pt-14">
            <div className="flex flex-col items-start justify-between gap-5 rounded-xl bg-[#1E3E70] px-8 py-10 text-white sm:flex-row sm:items-center md:px-10">
                <div>
                    <h2 className="text-[22px] font-bold">Ready to build your team?</h2>
                    <p className="mt-1.5 text-sm text-[#B7C4DD]">Set up your company and post your first job in minutes.</p>
                </div>
                <Link to={cta.to} className="rounded-lg bg-white px-5 py-3 text-sm font-semibold text-[#1E3E70] hover:bg-[#E9EEF7]">{cta.label}</Link>
            </div>
        </section>
    );
}
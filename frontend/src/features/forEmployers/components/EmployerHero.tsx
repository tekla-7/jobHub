import {useEmployerCta} from "../useEmployerCta";
import {Link} from "react-router-dom";
import heroImg from '../../../assets/employers-hero.svg';

export default function EmployerHero() {
    const cta = useEmployerCta();
    return (
        <section className="mx-auto grid max-w-[1160px] items-center gap-10 px-6 pb-4 pt-12 md:grid-cols-[1.05fr_0.95fr] md:pt-16">
            <div>
                <p className="mb-3 text-[13px] font-semibold text-[#28508E]">For employers</p>
                <h1 className="text-[36px] font-bold leading-[1.1] tracking-tight text-[#1E2530] md:text-[46px]">Hire the right person, faster.</h1>
                <p className="mt-4 max-w-[480px] text-base leading-relaxed text-[#667085]">
                    Post a job, receive applications from candidates on JobHub, and move every applicant through your pipeline, together with your whole team.
                </p>
                <div className="mt-7 flex flex-wrap gap-3">
                    <Link to={cta.to} className="rounded-lg bg-[#28508E] px-5 py-3 text-sm font-semibold text-white hover:bg-[#1E3E70]">{cta.label}</Link>
                    <Link to="#how-it-works" className="rounded-lg border border-[#E4E7EC] bg-white px-5 py-3 text-sm font-semibold text-[#1E2530] hover:bg-[#F8F9FB]">See how it works</Link>
                </div>
            </div>
            <img src={heroImg} alt="Applicants organised in columns from Applied to Hired" className="w-full rounded-[20px]" />
        </section>
    );
}

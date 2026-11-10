import {Link} from "react-router-dom";
import {PATHS} from "../../../routes/paths";

export default function CtaBand() {
    return (
        <section className="mx-auto max-w-[1160px] px-6 pt-14">
            <div className="flex flex-col items-start justify-between gap-5 rounded-xl bg-[#1E3E70] px-8 py-10 text-white sm:flex-row sm:items-center md:px-10">
                <div>
                    <h2 className="text-[22px] font-bold">Hiring? Reach candidates today.</h2>
                    <p className="mt-1.5 text-sm text-[#B7C4DD]">Post a job in under 5 minutes.</p>
                </div>
                <Link to={PATHS.register} className="rounded-lg bg-white px-5 py-3 text-sm font-semibold text-[#1E3E70] hover:bg-[#E9EEF7]">
                    Post a Job
                </Link>
            </div>
        </section>
    );
}

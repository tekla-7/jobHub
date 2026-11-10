import {Link, useNavigate} from "react-router-dom";
import React, {FormEvent, useState} from "react";
import {PATHS} from "../../../routes/paths";
import heroImg from '../../../assets/hero.svg';
import {POPULAR_SEARCHES} from "../data";

export default function Hero() {
    const navigate = useNavigate();
    const [search, setSearch] = useState('');
    const [location, setLocation] = useState('');

    const onSubmit = (e: FormEvent) => {
        e.preventDefault();
        const params = new URLSearchParams();
        if (search.trim()) params.set('search', search.trim());
        if (location.trim()) params.set('location', location.trim());
        navigate(`${PATHS.jobs}${params.toString() ? `?${params}` : ''}`);
    };

    return (
        <section className="mx-auto grid max-w-[1160px] items-center gap-10 px-6 pb-4 pt-12 md:grid-cols-[1.05fr_0.95fr] md:pt-16">
            <div>
                <h1 className="text-[36px] font-bold leading-[1.1] tracking-tight text-[#1E2530] md:text-[46px]">
                    Where careers move forward.
                </h1>
                <p className="mt-4 max-w-[440px] text-base leading-relaxed text-[#667085]">
                    Real openings from teams that are hiring today. Search, apply, and track every step in one place.
                </p>

                <form
                    onSubmit={onSubmit}
                    role="search"
                    className="mt-7 flex max-w-[560px] flex-col gap-1.5 rounded-xl border border-[#E4E7EC] bg-white p-1.5 shadow-[0_8px_24px_rgba(30,62,112,0.06)] sm:flex-row sm:items-center"
                >
                    <input
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        aria-label="Job title or skill"
                        placeholder="Job title or skill"
                        className="min-w-0 flex-1 rounded-lg bg-transparent px-3.5 py-3 text-sm text-[#1E2530] outline-none placeholder:text-[#98A2B3]"
                    />
                    <span className="hidden h-6 w-px bg-[#E4E7EC] sm:block" />
                    <input
                        value={location}
                        onChange={(e) => setLocation(e.target.value)}
                        aria-label="Location"
                        placeholder="Location"
                        className="min-w-0 rounded-lg bg-transparent px-3.5 py-3 text-sm text-[#1E2530] outline-none placeholder:text-[#98A2B3] sm:w-[150px]"
                    />
                    <button type="submit" className="rounded-lg bg-[#1E2530] px-5 py-3 text-sm font-semibold text-white hover:bg-black">
                        Find Jobs
                    </button>
                </form>

                <p className="mt-4 flex flex-wrap items-center gap-x-3 gap-y-1.5 text-[13px] text-[#667085]">
                    Popular:
                    {POPULAR_SEARCHES.map((p) => (
                        <Link key={p} to={`${PATHS.jobs}?search=${encodeURIComponent(p)}`} className="font-medium text-[#1E2530] hover:text-[#28508E]">
                            {p}
                        </Link>
                    ))}
                </p>
            </div>

            <img src={heroImg} alt="" className="w-full rounded-[20px]" />
        </section>
    );
}

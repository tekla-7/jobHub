import React from "react";
import {PATHS} from "../../../routes/paths";
import {Link} from "react-router-dom";
import Section from "./Section";
import CompanyMark from "../../../shared/components/CompanyMark";
import {useCompany} from "../queries/landing.queries";

export default function FeaturedCompanies() {
    const {data:FEATURED_COMPANIES=[]} = useCompany()
    return (
        <Section title="Featured companies" action={{ label: 'View all companies', to: PATHS.companies }}>
            <div className="grid grid-cols-2 gap-3 md:grid-cols-3">
                {FEATURED_COMPANIES.map((c) => (
                    <Link
                        key={c._id}
                        to={`${PATHS.companies}/${c._id}`}
                        className="flex items-center gap-3.5 rounded-[10px] border border-[#E4E7EC] bg-white p-4 transition-colors hover:border-[#28508E]"
                    >
                        <CompanyMark name={c.name} size={44} />
                        <div className="min-w-0">
                            <b className="block truncate text-sm text-[#1E2530]">{c.name}</b>
                            <span className="text-xs text-[#667085]">{c.industry} · {c.openRoles} open {c.openRoles === 1 ? 'role' : 'roles'}</span>
                        </div>
                    </Link>
                ))}
            </div>
        </Section>
    );
}
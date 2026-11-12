import {PATHS} from "../../../routes/paths";
import {Link} from "react-router-dom";
import Section from "./Section";
import {useCategories} from "../queries/landing.queries";

export default function Categories() {
    const {data:CATEGORIES=[]} = useCategories()

    return (
        <Section title="Browse by category">
            <div className="grid grid-cols-2 gap-3 md:grid-cols-3 lg:grid-cols-6">
                {CATEGORIES.slice(0,6)?.map((c) => (
                    <Link
                        key={c.slug}
                        to={`${PATHS.jobs}?category=${c.slug}`}
                        className="rounded-lg border border-[#E4E7EC] bg-white px-[18px] py-4 transition-colors hover:border-[#28508E]"
                    >
                        <b className="block text-sm text-[#1E2530]">{c.name}</b>
                        <span className="text-xs text-[#667085]">{c.jobs} jobs</span>
                    </Link>
                ))}
            </div>
        </Section>
    );
}
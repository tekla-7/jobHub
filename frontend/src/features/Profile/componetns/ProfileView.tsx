import {formatDuration, formatRange, totalMonths} from "../experience";
import Avatar from "../../../shared/components/Avatar";
import {ReactNode} from "react";
import {Profile} from "../type";

function Card({
                  title,
                  children,
              }: {
    title: string;
    children: ReactNode;
}) {
    return (
        <section className="rounded-[10px] border border-[#E4E7EC] bg-white p-6">
            <h2 className="mb-3 text-[15px] font-bold">{title}</h2>
            {children}
        </section>
    );
}

const muted = "text-sm text-[#667085]";

export default function ProfileView({
                                        profile: p,
                                        actions,
                                    }: {
    profile: Profile;
    actions?: ReactNode;
}) {
    const months = totalMonths(p.experience);

    const contact = [
        {label: "Email", value: p.email},
        {label: "Phone", value: p.phone},
        {label: "Website", value: p.website},
        {label: "LinkedIn", value: p.LinkedIn},
    ].filter((c) => !!c.value);

    return (
        <div className="space-y-4">
            <section className="rounded-[10px] border border-[#E4E7EC] bg-white p-6">
                <div className="flex flex-col gap-5 sm:flex-row sm:items-start">
                    <Avatar
                        name={p.name}
                        src={p.profileImg}
                        size={88}
                    />

                    <div className="min-w-0 flex-1">
                        <div className="flex flex-wrap items-center gap-2.5">
                            <h2 className="text-xl font-bold tracking-tight">
                                {p.name}
                            </h2>

                            {p.openToWork && (
                                <span
                                    className="rounded-full bg-[#E3F5EC] px-2.5 py-1 text-[11px] font-bold text-[#12805C]">
                                    Open to work
                                </span>
                            )}
                        </div>

                        {p.headline && (
                            <p className="mt-1 text-[15px] text-[#344054]">
                                {p.headline}
                            </p>
                        )}

                        <p className={`mt-1 ${muted}`}>
                            {[
                                p.location,
                                months > 0
                                    ? `${formatDuration(months)} of experience`
                                    : null,
                            ]
                                .filter(Boolean)
                                .join(" · ")}
                        </p>

                        {p.skills?.length > 0 && (
                            <div className="mt-3 flex flex-wrap gap-1.5">
                                {p.skills.map((s) => (
                                    <span
                                        key={s}
                                        className="rounded-[5px] bg-[#E9EEF7] px-2.5 py-1 text-[11.5px] font-semibold text-[#1E3E70]"
                                    >
                                        {s}
                                    </span>
                                ))}
                            </div>
                        )}
                    </div>

                    {actions}
                </div>
            </section>

            <Card title="About">
                {p.bio ? (
                    <p className="whitespace-pre-line text-[14.5px] leading-7 text-[#344054]">
                        {p.bio}
                    </p>
                ) : (
                    <p className={muted}>No bio added yet.</p>
                )}
            </Card>

            <Card title="Work experience">
                {!p.experience?.length ? (
                    <p className={muted}>No work experience added yet.</p>
                ) : (
                    <ul className="divide-y divide-[#E4E7EC]">
                        {p.experience.map((e, i) => (
                            <li
                                key={i}
                                className="py-4 first:pt-0 last:pb-0"
                            >
                                <b className="block text-[14.5px]">
                                    {e.position}
                                </b>

                                <span className="text-[13px] text-[#667085]">
                                    {e.company} · {formatRange(e.startAt, e.endAt)}
                                </span>

                                {e.description && (
                                    <p className="mt-2 whitespace-pre-line text-[13.5px] leading-6 text-[#344054]">
                                        {e.description}
                                    </p>
                                )}
                            </li>
                        ))}
                    </ul>
                )}
            </Card>

            <Card title="Education">
                {!p.education?.length ? (
                    <p className={muted}>No education added yet.</p>
                ) : (
                    <ul className="divide-y divide-[#E4E7EC]">
                        {p.education.map((e, i) => (
                            <li
                                key={i}
                                className="py-4 first:pt-0 last:pb-0"
                            >
                                <b className="block text-[14.5px]">
                                    {e.degree}
                                </b>

                                <span className="text-[13px] text-[#667085]">
                                    {e.institution}
                                    {e.startAt
                                        ? ` · ${new Date(e.startAt).getFullYear()} – ${
                                            e.endAt
                                                ? new Date(e.endAt).getFullYear()
                                                : "Present"
                                        }`
                                        : ""}
                                </span>
                            </li>
                        ))}
                    </ul>
                )}
            </Card>

            <Card title="CV">
                {p.cv ? (
                    <div className="flex items-center justify-between gap-3 rounded-lg bg-[#F8F9FB] px-4 py-3">
                        <span className="truncate text-sm font-medium">
                            CV
                        </span>

                        <a
                            href={p.cv}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="shrink-0 rounded-lg border border-[#E4E7EC] bg-white px-3.5 py-2 text-[13px] font-semibold hover:bg-[#F8F9FB]"
                        >
                            Download
                        </a>
                    </div>
                ) : (
                    <p className={muted}>No CV uploaded yet.</p>
                )}
            </Card>

            <Card title="Contact information">
                {contact.length === 0 ? (
                    <p className={muted}>
                        No contact details added.
                    </p>
                ) : (
                    <dl className="grid gap-x-8 gap-y-3 sm:grid-cols-2">
                        {contact.map((c) => (
                            <div key={c.label}>
                                <dt className="text-xs text-[#667085]">
                                    {c.label}
                                </dt>
                                <dd className="mt-0.5 break-words text-sm font-medium">
                                    {c.value}
                                </dd>
                            </div>
                        ))}
                    </dl>
                )}
            </Card>
        </div>
    );
}

import {Link} from "react-router-dom";
import {useAppSelector} from "../../store/hooks";
import {useProfile} from "../Profile/hooks/useProfile";
import {useApplications} from "../applications/useApplications";
import {useSavedJobs} from "../jobs/hooks/useSavedJobs";
import {profileCompletion} from "../Profile/completion";
import PageHeader from "../../shared/components/PageHeader";
import {PATHS} from "../../routes/paths";
import EmptyState from "../../shared/components/EmptyState";
import {formatDate} from "../jobs/format";
import StatusBadge from "../applications/StatusBadge";


function Stat({ label, value, to }: { label: string; value: number | string; to: string }) {
    return (
        <Link to={to} className="rounded-[10px] border border-[#E4E7EC] bg-white p-5 transition-colors hover:border-[#28508E]">
            <b className="block text-[26px] font-bold leading-none">{value}</b>
            <span className="mt-2 block text-[13px] text-[#667085]">{label}</span>
        </Link>
    );
}

export default function DashboardPage() {
    const user = useAppSelector((s) => s.auth.user);
    const profile = useProfile();
    const applications = useApplications();
    const saved = useSavedJobs();

    const apps = applications?.data?.items ?? [];
    const completion = profile.data ? profileCompletion(profile.data) : null;
    const missing = completion?.items.filter((i) => !i.done) ?? [];
    const firstName = user?.name.split(' ')[0] ?? '';
    const dash = (n: number | undefined) => (applications.isPending || n === undefined ? '–' : n);

    return (
        <div className="mx-auto max-w-[1000px]">
            <PageHeader title={`Welcome back, ${firstName}`} subtitle="Here's what's happening with your job search." />

            {completion && completion.percent < 100 && (
                <section className="mb-6 flex flex-col gap-5 rounded-[10px] border border-[#E4E7EC] bg-white p-5 sm:flex-row sm:items-center">
                    <div
                        role="img"
                        aria-label={`Profile ${completion.percent}% complete`}
                        className="flex h-16 w-16 shrink-0 items-center justify-center rounded-full"
                        style={{ background: `conic-gradient(#28508E ${completion.percent * 3.6}deg, #E4E7EC 0)` }}
                    >
                        <span className="flex h-[50px] w-[50px] items-center justify-center rounded-full bg-white text-[13px] font-bold">{completion.percent}%</span>
                    </div>
                    <div className="min-w-0 flex-1">
                        <b className="text-[15px]">Your profile is {completion.percent}% complete</b>
                        <p className="mt-1 text-[13px] text-[#667085]">
                            Next: {missing.slice(0, 2).map((m) => m.label.toLowerCase()).join(' · ')}
                        </p>
                    </div>
                    <Link to={`${PATHS.dashboard}/profile/edit`} className="rounded-lg border border-[#E4E7EC] bg-white px-4 py-2.5 text-center text-sm font-semibold hover:bg-[#F8F9FB]">Complete profile</Link>
                </section>
            )}

            <div className="mb-6 grid grid-cols-2 gap-4 lg:grid-cols-4">
                <Stat label="Applications" value={dash(apps?.length)} to={`${PATHS.dashboard}/applications`} />
                <Stat label="Under review" value={dash(apps?.filter((a) => a.status === 'reviewing').length)} to={`${PATHS.dashboard}/applications`} />
                <Stat label="Interviews" value={dash(apps.filter((a) => a.status === 'interview').length)} to={`${PATHS.dashboard}/applications`} />
                <Stat label="Saved jobs" value={saved.data ? saved.data.length : '–'} to={`${PATHS.dashboard}/saved`} />
            </div>

            <section>
                <div className="mb-3 flex items-end justify-between">
                    <h2 className="text-xs font-bold uppercase tracking-[0.06em] text-[#667085]">Recent applications</h2>
                    {apps.length > 0 && <Link to={`${PATHS.dashboard}/applications`} className="text-[13px] font-semibold text-[#28508E] hover:underline">View all →</Link>}
                </div>

                {applications.isError ? (
                    <p className="rounded-[10px] border border-[#E4E7EC] bg-white p-6 text-sm text-[#667085]">Couldn't load your applications.</p>
                ) : applications.isPending ? (
                    <div className="h-40 animate-pulse rounded-[10px] bg-[#EEF0F2]" aria-hidden />
                ) : apps.length === 0 ? (
                    <EmptyState title="No applications yet" text="Find a job you like and apply. It will show up here." action={{ label: 'Browse jobs', to: PATHS.jobs }} />
                ) : (
                    <div className="overflow-x-auto rounded-[10px] border border-[#E4E7EC] bg-white">
                        <table className="w-full min-w-[520px] text-left text-[13.5px]">
                            <thead>
                            <tr className="border-b border-[#E4E7EC] text-[11px] uppercase tracking-wider text-[#667085]">
                                <th className="px-5 py-3 font-bold">Position</th><th className="px-5 py-3 font-bold">Company</th><th className="px-5 py-3 font-bold">Applied</th><th className="px-5 py-3 font-bold">Status</th>
                            </tr>
                            </thead>
                            <tbody>
                            {apps.slice(0, 5).map((a) => (
                                <tr key={a._id} className="border-b border-[#E4E7EC] last:border-0">
                                    <td className="px-5 py-3.5 font-semibold">
                                        {a.job ? <Link to={`${PATHS.jobs}/${a.job._id}`} className="hover:text-[#28508E]">{a.job.title}</Link> : <span className="text-[#667085]">Job removed</span>}
                                    </td>
                                    <td className="px-5 py-3.5 text-[#667085]">{a.job?.company.name ?? '—'}</td>
                                    <td className="px-5 py-3.5 text-[#667085]">{formatDate(a.createdAt)}</td>
                                    <td className="px-5 py-3.5"><StatusBadge status={a.status} /></td>
                                </tr>
                            ))}
                            </tbody>
                        </table>
                    </div>
                )}
            </section>
        </div>
    );
}

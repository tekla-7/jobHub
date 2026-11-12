import Section from "../../landing/components/Section";
import {can, Permission} from "../../auth/permissions";
import {CompanyRole} from "../../auth/auth.types";

const ROLES: { role: CompanyRole; label: string }[] = [
    { role: 'owner', label: 'Owner' },
    { role: 'admin', label: 'Admin' },
    { role: 'recruiter', label: 'Recruiter' },
];

const ROWS: { label: string; permission: Permission }[] = [
    { label: 'Post and manage jobs', permission: 'jobs.manage' },
    { label: 'Review applicants and change their status', permission: 'applicants.manage' },
    { label: 'Invite teammates', permission: 'team.invite' },
    { label: 'Edit the company page', permission: 'company.edit' },
    { label: 'Remove team members', permission: 'team.remove' },
    { label: 'Deactivate the company', permission: 'company.deactivate' },
];

export default function RolesTable() {
    return (
        <Section title="Team roles">
            <p className="mb-4 max-w-[560px] text-sm text-[#667085]">Give every teammate only the access they need.</p>
            <div className="overflow-x-auto rounded-[10px] border border-[#E4E7EC] bg-white">
                <table className="w-full min-w-[480px] text-left text-[13.5px]">
                    <thead>
                    <tr className="border-b border-[#E4E7EC] text-[11px] uppercase tracking-wider text-[#667085]">
                        <th className="px-5 py-3 font-bold">What they can do</th>
                        {ROLES.map((r) => <th key={r.role} className="px-5 py-3 text-center font-bold">{r.label}</th>)}
                    </tr>
                    </thead>
                    <tbody>
                    {ROWS.map((row) => (
                        <tr key={row.permission} className="border-b border-[#E4E7EC] last:border-0">
                            <td className="px-5 py-3.5 text-[#1E2530]">{row.label}</td>
                            {ROLES.map((r) => {
                                const yes = can(r.role, row.permission);
                                return (
                                    <td key={r.role} className="px-5 py-3.5 text-center">
                                        <span aria-label={yes ? 'Yes' : 'No'} className={yes ? 'font-bold text-[#12805C]' : 'text-[#C4CAD4]'}>{yes ? '✓' : '—'}</span>
                                    </td>
                                );
                            })}
                        </tr>
                    ))}
                    </tbody>
                </table>
            </div>
        </Section>
    );
}

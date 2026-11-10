import {PATHS} from "../../routes/paths";
import {useAppSelector} from "../../store/hooks";
import {selectActiveMembership} from "../../features/auth/authSelector";
import React, {useEffect, useState} from "react";
import {Link, NavLink, Outlet, useLocation} from "react-router-dom";
import {can} from "../../features/auth/permissions";
import UserMenu from "../components/UserMenu";
import AccountSwitcher from "../components/AccountSwitcher";

interface NavItem { to: string; label: string; end?: boolean }
const PERSONAL_NAV: NavItem[] = [
    { to: PATHS.dashboard, label: 'Overview', end: true },
    { to: `${PATHS.dashboard}/profile`, label: 'My Profile' },
    { to: `${PATHS.dashboard}/saved`, label: 'Saved Jobs' },
    { to: `${PATHS.dashboard}/applications`, label: 'Applications' },
    { to: `${PATHS.dashboard}/settings`, label: 'Settings' },
];

const navCls = ({ isActive }: { isActive: boolean }) =>
    `block rounded-lg px-3 py-2 text-[13.5px] ${isActive ? 'bg-[#E9EEF7] font-bold text-[#1E3E70]' : 'font-medium text-[#667085] hover:bg-[#F8F9FB]'}`;

export default function DashboardLayout({ variant }: { variant: 'personal' | 'company' }) {
    const membership = useAppSelector(selectActiveMembership);
    const [open, setOpen] = useState(false);
    const { pathname } = useLocation();
    useEffect(() => setOpen(false), [pathname]);
    const companyNav: NavItem[] = [
        { to: PATHS.employer, label: 'Overview', end: true },
        { to: `${PATHS.employer}/jobs`, label: 'My Jobs', end: true },
        { to: `${PATHS.employer}/jobs/new`, label: 'Post a Job' },
        { to: `${PATHS.employer}/company`, label: 'Company Profile', end: true },
        ...(can(membership?.role, 'team.invite') ? [{ to: `${PATHS.employer}/team`, label: 'Team' }] : []),
    ];
    const items = variant === 'personal' ? PERSONAL_NAV : companyNav;

    return (
        <div className="min-h-screen bg-[#F8F9FB] text-[#1E2530]">
            {open && <div className="fixed inset-0 z-30 bg-black/40 lg:hidden" onClick={() => setOpen(false)} />}

            <aside
                className={`fixed inset-y-0 left-0 z-40 w-[224px] overflow-y-auto border-r border-[#E4E7EC] bg-white p-3 transition-transform lg:translate-x-0 ${
                    open ? 'translate-x-0' : '-translate-x-full'
                }`}
            >
                <Link to={PATHS.home} className="mb-4 block px-2.5 pt-2 text-[16px] font-extrabold">
                    Job<span className="text-[#28508E]">Hub</span>
                </Link>
                <AccountSwitcher />
                <nav className="flex flex-col gap-0.5" aria-label="Dashboard">
                    {items.map((i) => <NavLink key={i.to} to={i.to} end={i.end} className={navCls}>{i.label}</NavLink>)}
                </nav>
            </aside>

            <div className="lg:pl-[224px]">
                <header className="flex h-14 items-center justify-between border-b border-[#E4E7EC] bg-white px-4 lg:justify-end lg:px-8">
                    <button
                        type="button"
                        className="inline-flex h-9 w-9 items-center justify-center rounded-lg border border-[#E4E7EC] lg:hidden"
                        aria-label="Open menu"
                        onClick={() => setOpen(true)}
                    >
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#1E2530" strokeWidth="2" strokeLinecap="round"><path d="M4 7h16M4 12h16M4 17h16" /></svg>
                    </button>
                    <UserMenu />
                </header>
                <main className="p-4 lg:p-8">
                    <Outlet />
                </main>
            </div>
        </div>
    );
}

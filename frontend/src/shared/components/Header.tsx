import { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import UserMenu from './UserMenu';
import {useAppSelector} from "../../store/hooks";
import {PATHS} from "../../routes/paths";

const LINKS = [
    { to: '/jobs', label: 'Jobs' },
    { to: '/companies', label: 'Companies' },
    { to: '/for-employers', label: 'For Employers' },
];

const linkCls = ({ isActive }: { isActive: boolean }) =>
    `text-sm font-medium transition-colors ${isActive ? 'text-[#1E2530]' : 'text-[#667085] hover:text-[#1E2530]'}`;

const btnGhost =
    'inline-flex items-center justify-center rounded-lg border border-[#E4E7EC] bg-white px-3.5 py-[7px] text-[13px] font-semibold text-[#1E2530] hover:bg-[#F8F9FB]';
const btnPri =
    'inline-flex items-center justify-center rounded-lg bg-[#28508E] px-3.5 py-[7px] text-[13px] font-semibold text-white hover:bg-[#1E3E70]';

export default function Header() {
    const user = useAppSelector((s) => s.auth.user);
    const [open, setOpen] = useState(false);

    const postJobTo = !user ? '/register' : user.memberships.length ? '/employer/jobs/new' : null;

    return (
        <header className="border-b border-[#E4E7EC] bg-[#F8F9FB]">
            <div className="mx-auto flex h-[68px] max-w-[1160px] items-center justify-between px-6">
                <Link to="/" className="text-[18px] font-extrabold text-[#1E2530]">
                    Job<span className="text-[#28508E]">Hub</span>
                </Link>

                <nav className="hidden items-center gap-[26px] md:flex" aria-label="Main">
                    {LINKS.map((l) => (
                        <NavLink key={l.to} to={l.to} className={linkCls}>{l.label}</NavLink>
                    ))}
                </nav>

                <div className="flex items-center gap-2.5">
                    {user ? (
                        <>
                            {postJobTo && <Link to={postJobTo} className={`${btnPri} hidden md:inline-flex`}>Post a Job</Link>}
                            <UserMenu />
                        </>
                    ) : (
                        <div className="hidden items-center gap-2.5 md:flex">
                            <Link to={PATHS.login} className={btnGhost}>Log in</Link>
                            <Link to={postJobTo!} className={btnPri}>Post a Job</Link>
                        </div>
                    )}
                    <button
                        type="button"
                        className="inline-flex h-9 w-9 items-center justify-center rounded-lg border border-[#E4E7EC] bg-white md:hidden"
                        aria-label={open ? 'Close menu' : 'Open menu'}
                        aria-expanded={open}
                        onClick={() => setOpen((v) => !v)}
                    >
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#1E2530" strokeWidth="2" strokeLinecap="round">
                            {open ? <path d="M6 6l12 12M18 6L6 18" /> : <path d="M4 7h16M4 12h16M4 17h16" />}
                        </svg>
                    </button>
                </div>
            </div>

            {open && (
                <div className="border-t border-[#E4E7EC] bg-white px-6 pb-5 pt-3 md:hidden">
                    <nav className="flex flex-col" aria-label="Mobile">
                        {LINKS.map((l) => (
                            <NavLink
                                key={l.to}
                                to={l.to}
                                onClick={() => setOpen(false)}
                                className={({ isActive }) =>
                                    `border-b border-[#E4E7EC] py-3 text-[15px] font-medium ${isActive ? 'text-[#28508E]' : 'text-[#1E2530]'}`
                                }
                            >
                                {l.label}
                            </NavLink>
                        ))}
                    </nav>
                    {!user && (
                        <div className="mt-4 grid grid-cols-2 gap-2.5">
                            <Link to={PATHS.login} onClick={() => setOpen(false)} className={btnGhost}>Log in</Link>
                            <Link to={PATHS.register} onClick={() => setOpen(false)} className={btnPri}>Post a Job</Link>
                        </div>
                    )}
                    {user && postJobTo && (
                        <Link to={postJobTo} onClick={() => setOpen(false)} className={`${btnPri} mt-4 w-full`}>Post a Job</Link>
                    )}
                </div>
            )}
        </header>
    );
}

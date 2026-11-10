import { useEffect, useRef, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useQueryClient } from '@tanstack/react-query';
import { can } from '../../features/auth/permissions';
import {useAppDispatch, useAppSelector} from "../../store/hooks";
import {logout, switchContext} from "../../store/user-slice";
import {selectActiveMembership} from "../../features/auth/authSelector";
import {PATHS} from "../../routes/paths";
const itemCls = 'block rounded-lg px-2.5 py-2 text-[13px] font-semibold text-[#1E2530] hover:bg-[#F8F9FB]';
const cap = (s: string) => s[0].toUpperCase() + s.slice(1);

export default function UserMenu() {
    const user = useAppSelector((s) => s.auth.user);
    const activeCompanyId = useAppSelector((s) => s.auth.activeCompanyId);
    const membership = useAppSelector(selectActiveMembership);
    const dispatch = useAppDispatch();
    const qc = useQueryClient();
    const navigate = useNavigate();
    const [open, setOpen] = useState(false);
    const ref = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const onClick = (e: MouseEvent) => { if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false); };
        const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') setOpen(false); };
        document.addEventListener('mousedown', onClick);
        document.addEventListener('keydown', onKey);
        return () => { document.removeEventListener('mousedown', onClick); document.removeEventListener('keydown', onKey); };
    }, []);

    if (!user) return null;

    const initials = user.name.split(' ').map((p) => p[0]).slice(0, 2).join('').toUpperCase();

    const switchTo = (companyId: string | null) => {
        dispatch(switchContext(companyId));
        setOpen(false);
        navigate(companyId ? '/employer' : '/dashboard');
    };

    const handleLogout = () => { dispatch(logout()); qc.clear(); setOpen(false); navigate('/'); };

    const links = membership
        ? [
            { to: PATHS.employer, label: 'Dashboard' },
            { to: `${PATHS.employer}/jobs`, label: 'My Jobs' },
            { to: `${PATHS.employer}/company`, label: 'Company Page' },
            ...(can(membership.role, 'team.invite') ? [{ to: `${PATHS.employer}/team`, label: 'Team' }] : []),
        ]
        : [
            { to: PATHS.dashboard, label: 'Dashboard' },
            { to: `${PATHS.dashboard}/profile`, label: 'My Profile' },
            { to: `${PATHS.dashboard}/saved`, label: 'Saved Jobs' },
            { to: `${PATHS.dashboard}/applications`, label: 'My Applications' },
            { to: `${PATHS.dashboard}/settings`, label: 'Settings' },
        ];

    return (
        <div ref={ref} className="relative">
            <button
                type="button"
                onClick={() => setOpen((v) => !v)}
                aria-haspopup="menu"
                aria-expanded={open}
                aria-label="Account menu"
                className="flex h-[38px] w-[38px] items-center justify-center overflow-hidden rounded-full bg-[#28508E] text-[13px] font-semibold text-white hover:ring-2 hover:ring-[#E9EEF7]"
            >
                {initials}
            </button>

            {open && (
                <div
                    role="menu"
                    className="absolute right-0 top-[calc(100%+8px)] z-50 max-h-[80vh] w-[270px] overflow-y-auto rounded-xl border border-[#E4E7EC] bg-white p-1.5 shadow-[0_14px_36px_rgba(30,37,48,0.16)]"
                >
                    <div className="px-2.5 py-2 leading-tight">
                        <b className="block truncate text-[13px] text-[#1E2530]">{user.name}</b>
                        <span className="block truncate text-[11px] text-[#667085]">{user.email}</span>
                    </div>

                    <hr className="my-1.5 border-t border-[#E4E7EC]" />
                    <p className="px-2.5 pb-1 pt-1.5 text-[10.5px] font-bold uppercase tracking-wider text-[#667085]">Switch account</p>

                    <button
                        type="button"
                        role="menuitemradio"
                        aria-checked={!activeCompanyId}
                        onClick={() => switchTo(null)}
                        className={`flex w-full items-center gap-2.5 rounded-lg px-2.5 py-2 text-left hover:bg-[#F8F9FB] ${!activeCompanyId ? 'bg-[#E9EEF7]' : ''}`}
                    >
                        <span className="flex h-[30px] w-[30px] shrink-0 items-center justify-center rounded-full bg-[#28508E] text-[12px] font-semibold text-white">{initials}</span>
                        <span className="min-w-0 flex-1 leading-tight">
              <b className="block truncate text-[13px]">{user.name}</b>
              <span className="text-[11px] text-[#667085]">Personal</span>
            </span>
                        {!activeCompanyId && <span className="font-bold text-[#28508E]">✓</span>}
                    </button>

                    {user.memberships.map((m) => {
                        const active = m.company._id === activeCompanyId;
                        return (
                            <button
                                key={m.company._id}
                                type="button"
                                role="menuitemradio"
                                aria-checked={active}
                                onClick={() => switchTo(m.company._id)}
                                className={`flex w-full items-center gap-2.5 rounded-lg px-2.5 py-2 text-left hover:bg-[#F8F9FB] ${active ? 'bg-[#E9EEF7]' : ''}`}
                            >
                                {m.company.logo ? (
                                    <img src={m.company.logo} alt="" className="h-[30px] w-[30px] shrink-0 rounded-lg object-cover" />
                                ) : (
                                    <span className="flex h-[30px] w-[30px] shrink-0 items-center justify-center rounded-lg bg-[#E9EEF7] text-[12px] font-bold text-[#1E3E70]">
                    {m.company.name[0].toUpperCase()}
                  </span>
                                )}
                                <span className="min-w-0 flex-1 leading-tight">
                  <b className="block truncate text-[13px]">{m.company.name}</b>
                  <span className="text-[11px] text-[#667085]">Company · {cap(m.role)}</span>
                </span>
                                {active && <span className="font-bold text-[#28508E]">✓</span>}
                            </button>
                        );
                    })}

                    <hr className="my-1.5 border-t border-[#E4E7EC]" />
                    {links.map((l) => (
                        <Link key={l.to} to={l.to} role="menuitem" onClick={() => setOpen(false)} className={itemCls}>{l.label}</Link>
                    ))}

                    <hr className="my-1.5 border-t border-[#E4E7EC]" />
                    <button type="button" role="menuitem" onClick={handleLogout} className={`${itemCls} w-full text-left`}>Log out</button>
                </div>
            )}
        </div>
    );
}

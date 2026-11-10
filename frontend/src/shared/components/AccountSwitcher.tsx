import {useEffect, useRef, useState} from "react";
import {cap, initialsOf} from "../utils/utils";
import AccountRow from "./AccountRow";
import {useAccountSwitch} from "../../features/auth/useAccountSwitcher";

export default function AccountSwitcher() {
    const { user, activeCompanyId, membership, switchTo } = useAccountSwitch();
    const [open, setOpen] = useState(false);
    const ref = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const onClick = (e: MouseEvent) => { if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false); };
        document.addEventListener('mousedown', onClick);
        return () => document.removeEventListener('mousedown', onClick);
    }, []);

    if (!user) return null;
    const initials = initialsOf(user.name);
    const choose = (id: string | null) => { switchTo(id); setOpen(false); };

    const current = membership
        ? { title: membership.company.name, sub: `Company · ${cap(membership.role)}`, initial: membership.company.name.charAt(0).toUpperCase(), logo: membership.company.logo, round: false }
        : { title: user.name, sub: 'Personal', initial: initials, logo: undefined, round: true };

    return (
        <div ref={ref} className="relative mb-4">
            <button
                type="button"
                onClick={() => setOpen((v) => !v)}
                aria-haspopup="menu"
                aria-expanded={open}
                className="flex w-full items-center gap-2.5 rounded-[10px] border border-[#E4E7EC] bg-[#F8F9FB] px-2.5 py-2 text-left"
            >
                {current.logo ? (
                    <img src={current.logo} alt="" className="h-[30px] w-[30px] shrink-0 rounded-lg object-cover" />
                ) : (
                    <span className={`flex h-[30px] w-[30px] shrink-0 items-center justify-center text-[12px] font-bold ${current.round ? 'rounded-full bg-[#28508E] text-white' : 'rounded-lg bg-[#E9EEF7] text-[#1E3E70]'}`}>
            {current.initial}
          </span>
                )}
                <span className="min-w-0 flex-1 leading-tight">
          <b className="block truncate text-[13px] text-[#1E2530]">{current.title}</b>
          <span className="text-[11px] text-[#667085]">{current.sub}</span>
        </span>
                <span className="text-sm text-[#667085]">⌄</span>
            </button>

            {open && (
                <div role="menu" className="absolute left-0 right-0 top-[calc(100%+6px)] z-50 min-w-[240px] rounded-xl border border-[#E4E7EC] bg-white p-1.5 shadow-[0_14px_36px_rgba(30,37,48,0.16)]">
                    <p className="px-2.5 pb-1 pt-1.5 text-[10.5px] font-bold uppercase tracking-wider text-[#667085]">Switch account</p>
                    <AccountRow round title={user.name} subtitle="Personal" initial={initials} active={!activeCompanyId} onClick={() => choose(null)} />
                    {user.memberships.map((m) => (
                        <AccountRow
                            key={m.company._id}
                            title={m.company.name}
                            subtitle={`Company · ${cap(m.role)}`}
                            initial={m.company.name?m.company.name.charAt(0).toUpperCase():''}
                            logo={m.company.logo}
                            active={m.company._id === activeCompanyId}
                            onClick={() => choose(m.company._id)}
                        />
                    ))}
                </div>
            )}
        </div>
    );
}

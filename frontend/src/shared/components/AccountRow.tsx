interface Props {
    title: string;
    subtitle: string;
    initial: string;
    logo?: string;
    round?: boolean;
    active: boolean;
    onClick: () => void;
}

export default function AccountRow({ title, subtitle, initial, logo, round, active, onClick }: Props) {
    return (
        <button
            type="button"
            role="menuitemradio"
            aria-checked={active}
            onClick={onClick}
            className={`flex w-full items-center gap-2.5 rounded-lg px-2.5 py-2 text-left hover:bg-[#F8F9FB] ${active ? 'bg-[#E9EEF7]' : ''}`}
        >
            {logo ? (
                <img src={logo} alt="" className="h-[30px] w-[30px] shrink-0 rounded-lg object-cover" />
            ) : (
                <span
                    className={`flex h-[30px] w-[30px] shrink-0 items-center justify-center text-[12px] font-bold ${
                        round ? 'rounded-full bg-[#28508E] text-white' : 'rounded-lg bg-[#E9EEF7] text-[#1E3E70]'
                    }`}
                >
          {initial}
        </span>
            )}
            <span className="min-w-0 flex-1 leading-tight">
        <b className="block truncate text-[13px] text-[#1E2530]">{title}</b>
        <span className="text-[11px] text-[#667085]">{subtitle}</span>
      </span>
            {active && <span className="font-bold text-[#28508E]">✓</span>}
        </button>
    );
}

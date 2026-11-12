interface Props { page: number; pages: number; onChange: (p: number) => void }

export default function Pagination({ page, pages, onChange }: Props) {
    if (pages <= 1) return null;

    const wanted = [...new Set([1, pages, page - 1, page, page + 1])].filter((n) => n >= 1 && n <= pages).sort((a, b) => a - b);
    const items: (number | '…')[] = [];
    wanted.forEach((n, i) => { if (i > 0 && n - wanted[i - 1] > 1) items.push('…'); items.push(n); });

    const base = 'inline-flex h-9 min-w-9 items-center justify-center rounded-lg border px-3 text-[13px] font-semibold';
    return (
        <nav aria-label="Pagination" className="mt-6 flex flex-wrap items-center justify-center gap-1.5">
            <button type="button" disabled={page <= 1} onClick={() => onChange(page - 1)} className={`${base} border-[#E4E7EC] bg-white disabled:opacity-40`}>← Prev</button>
            {items.map((it, i) =>
                it === '…' ? (
                    <span key={`gap-${i}`} className="px-1 text-[#667085]">…</span>
                ) : (
                    <button
                        key={it}
                        type="button"
                        onClick={() => onChange(it)}
                        aria-current={it === page ? 'page' : undefined}
                        className={`${base} ${it === page ? 'border-[#28508E] bg-[#28508E] text-white' : 'border-[#E4E7EC] bg-white text-[#1E2530] hover:bg-[#F8F9FB]'}`}
                    >
                        {it}
                    </button>
                ),
            )}
            <button type="button" disabled={page >= pages} onClick={() => onChange(page + 1)} className={`${base} border-[#E4E7EC] bg-white disabled:opacity-40`}>Next →</button>
        </nav>
    );
}

import {ReactNode, useEffect} from "react";

interface Props { open: boolean; onClose: () => void; title: string; children: ReactNode }

export default function Modal({ open, onClose, title, children }: Props) {
    useEffect(() => {
        if (!open) return;
        const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose(); };
        document.addEventListener('keydown', onKey);
        const prev = document.body.style.overflow;
        document.body.style.overflow = 'hidden';
        return () => { document.removeEventListener('keydown', onKey); document.body.style.overflow = prev; };
    }, [open, onClose]);

    if (!open) return null;
    return (
        <div
            role="presentation"
            className="fixed inset-0 z-[60] flex items-center justify-center bg-black/45 p-5"
            onMouseDown={(e) => { if (e.target === e.currentTarget) onClose(); }}
        >
            <div role="dialog" aria-modal="true" aria-label={title} className="w-full max-w-[460px] rounded-2xl bg-white p-6 shadow-[0_20px_60px_rgba(0,0,0,0.25)]">
                {children}
            </div>
        </div>
    );
}

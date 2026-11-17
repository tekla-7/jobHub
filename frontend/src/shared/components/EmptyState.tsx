import { Link } from 'react-router-dom';

export default function EmptyState({ title, text, action }: { title: string; text?: string; action?: { label: string; to: string } }) {
    return (
        <div className="rounded-[10px] border border-[#E4E7EC] bg-white p-10 text-center">
            <p className="font-semibold text-[#1E2530]">{title}</p>
            {text && <p className="mx-auto mt-1 max-w-[420px] text-sm text-[#667085]">{text}</p>}
            {action && (
                <Link to={action.to} className="mt-4 inline-flex rounded-lg bg-[#28508E] px-4 py-2.5 text-sm font-semibold text-white hover:bg-[#1E3E70]">{action.label}</Link>
            )}
        </div>
    );
}

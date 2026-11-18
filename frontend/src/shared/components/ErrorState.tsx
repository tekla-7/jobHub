export default function ErrorState({ message = "Couldn't load this page.", onRetry }: { message?: string; onRetry: () => void }) {
    return (
        <div className="rounded-[10px] border border-[#E4E7EC] bg-white p-10 text-center">
            <p className="font-semibold text-[#1E2530]">{message}</p>
            <p className="mt-1 text-sm text-[#667085]">Check your connection and try again.</p>
            <button type="button" onClick={onRetry} className="mt-4 rounded-lg bg-[#28508E] px-4 py-2.5 text-sm font-semibold text-white hover:bg-[#1E3E70]">Retry</button>
        </div>
    );
}

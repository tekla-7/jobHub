import { Outlet } from 'react-router-dom';

export function Placeholder({ title }: { title: string }) {
    return <div className="p-8 text-lg font-semibold">{title}</div>;
}

export function TempPublicLayout() {
    return <Outlet />;
}

export function TempDashboardShell() {
    return (
        <div>
            <div className="border-b border-[#E4E7EC] bg-white px-6 py-3 text-sm text-[#667085]">Temporary dashboard layout</div>
            <Outlet />
        </div>
    );
}

import {Navigate} from "react-router-dom";
import {ReactNode} from "react";

import {useAppSelector} from "../store/hooks";
import {homeFor} from "../shared/utils/homeFrom";

export default function PublicRoute({ children }: { children: ReactNode }) {
    const { user, ready } = useAppSelector((s) => s.auth);

    if (!ready) return <div className="grid min-h-screen place-items-center text-sm text-[#667085]">Loading…</div>;
    if (user) return <Navigate to={homeFor(user)} replace />;
    return <>{children}</>;
}
import {ReactNode, useEffect} from 'react';
import { Navigate, Outlet, useLocation } from 'react-router-dom';
import {CompanyRole} from "../features/auth/auth.types";
import {useAppDispatch, useAppSelector} from "../store/hooks";
import {selectActiveMembership} from "../features/auth/authSelector";
import {switchContext} from "../store/user-slice";
import {homeFor} from "../shared/utils/homeFrom";
import {PATHS} from "./paths";

function Spinner() {
    return <div className="grid min-h-screen place-items-center text-sm text-[#667085]">Loading…</div>;
}

interface Props {
    context?: 'personal' | 'company';
    companyRoles?: CompanyRole[];
    children?:ReactNode
}

export function ProtectedRoute({ context, companyRoles,children }: Props) {
    const { user, ready, activeCompanyId } = useAppSelector((s) => s.auth);
    const membership = useAppSelector(selectActiveMembership);
    const dispatch = useAppDispatch();
    const location = useLocation();
    const firstCompanyId = user?.memberships?.[0]?.company?._id ?? null;
    useEffect(() => {
        if (!user) return;
        if (context === 'personal' && activeCompanyId) dispatch(switchContext(null));
        if (context === 'company' && !membership && firstCompanyId) dispatch(switchContext(firstCompanyId));
    }, [user, context, activeCompanyId, membership, firstCompanyId, dispatch]);

    if (!ready) return <Spinner />;
    if (!user) {
        return <Navigate to={PATHS.login} replace state={{ from: location }} />;
    }
    if (context === 'company') {
        if (!membership) return firstCompanyId ? <Spinner /> : <Navigate to={PATHS.dashboard} replace />;
        if (companyRoles && !companyRoles.includes(membership.role)) return <Navigate to={PATHS.employer} replace />;
    }

    return children?<>{children}</>:<Outlet />;
}
export function GuestRoute() {
    const { user, ready } = useAppSelector((s) => s.auth);
    if (!ready) return <Spinner />;
    if (user) return <Navigate to={homeFor(user)} replace />;
    return <Outlet />;
}

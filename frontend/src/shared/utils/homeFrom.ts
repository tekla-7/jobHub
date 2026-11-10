import {User} from "../../features/auth/auth.types";

export const ACTIVE_KEY = 'activeCompanyId';

export function resolveActiveCompanyId(user: User): string | null {
    const saved = localStorage.getItem(ACTIVE_KEY);
    return saved && user.memberships.some((m) => m.company._id === saved) ? saved : null;
}

export function homeFor(user: User): string {
    return resolveActiveCompanyId(user) ? '/employer' : '/dashboard';
}
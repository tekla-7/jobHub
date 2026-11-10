import {CompanyRole} from "./auth.types";
import {useAppSelector} from "../../store/hooks";
import {selectActiveMembership} from "./authSelector";

export type Permission =
    | 'jobs.manage'
    | 'applicants.manage'
    | 'team.invite'
    | 'team.remove'
    | 'company.edit'
    | 'company.deactivate'
    | 'billing';

const ALLOWED: Record<Permission, CompanyRole[]> = {
    'jobs.manage': ['owner', 'admin', 'recruiter'],
    'applicants.manage': ['owner', 'admin', 'recruiter'],
    'team.invite': ['owner', 'admin'],
    'team.remove': ['owner'],
    'company.edit': ['owner'],
    'company.deactivate': ['owner'],
    billing: ['owner'],
};

export const can = (role: CompanyRole | undefined, action: Permission) => !!role && ALLOWED[action].includes(role);

export function useCan(action: Permission) {
    return can(useAppSelector(selectActiveMembership)?.role, action);
}
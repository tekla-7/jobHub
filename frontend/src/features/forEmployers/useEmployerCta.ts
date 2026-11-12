import {useAppSelector} from "../../store/hooks";
import {PATHS} from "../../routes/paths";

export function useEmployerCta(): { label: string; to: string } {
    const user = useAppSelector((s) => s.auth.user);

    if (!user) return { label: 'Create a company account', to: `${PATHS.register}?mode=company` };

    if (user.memberships.length) return { label: 'Go to your company dashboard', to: PATHS.employer };

    // TODO: create a company page/flow
    return { label: 'Create your company', to: `${PATHS.dashboard}/settings` };
}

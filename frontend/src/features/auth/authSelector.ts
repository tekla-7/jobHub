import {RootState} from "../../core/store.config";

export const selectActiveMembership = (state: RootState) => {
    const { user, activeCompanyId } = state.auth;

    if (!user || !user.memberships) return null;

    return user.memberships.find(
        (m) => m.company._id === activeCompanyId
    ) || null;
};
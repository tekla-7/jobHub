import {useAppDispatch, useAppSelector} from "../../store/hooks";
import {selectActiveMembership} from "./authSelector";
import {switchContext} from "../../store/user-slice";
import {PATHS} from "../../routes/paths";
import {useNavigate} from "react-router-dom";

export function useAccountSwitch() {
    const user = useAppSelector((s) => s.auth.user);
    const activeCompanyId = useAppSelector((s) => s.auth.activeCompanyId);
    const membership = useAppSelector(selectActiveMembership);
    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    const switchTo = (companyId: string | null) => {
        dispatch(switchContext(companyId));
        navigate(companyId ? PATHS.employer : PATHS.dashboard);
    };

    return { user, activeCompanyId, membership, switchTo };
}

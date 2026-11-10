import {Navigate} from "react-router-dom";
import {FullPageSpinner} from "../shared/components/Spinner";
import {Placeholder} from "../shared/components/Placeholders";
import {useAppSelector} from "../store/hooks";
import {homeFor} from "../shared/utils/homeFrom";

export default function RootRedirect() {
    const { user, ready } = useAppSelector((s) => s.auth);
    if (!ready) return <FullPageSpinner />;
    if (user) return <Navigate to={homeFor(user)} replace />;
    return <Placeholder title="Landing page" />;
}

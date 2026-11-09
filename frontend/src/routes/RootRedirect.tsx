import {Navigate} from "react-router-dom";
import {isAuthenticated} from "../shared/utils/auth";

export default function RootRedirect() {
    return isAuthenticated() ? (
        <Navigate to="/home" />
    ) : (
        <Navigate to="/login" />
    )
}
import {isAuthenticated} from "../shared/utils/auth";
import {Navigate} from "react-router-dom";
import {ReactNode} from "react";

export default function PublicRoute({children}: { children: ReactNode }) {
    return !isAuthenticated()?children:<Navigate to="/"/>
}
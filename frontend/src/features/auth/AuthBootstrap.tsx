import {useAppDispatch, useAppSelector} from "../../store/hooks";
import {api} from "../../core/api";
import {useQuery} from "@tanstack/react-query";
import {ReactNode, useEffect} from "react";
import {logout, setUser} from "../../store/user-slice";
import {User} from "./auth.types";

export default function AuthBootstrap({ children }: { children: ReactNode }) {
    const dispatch = useAppDispatch();
    const { token, user } = useAppSelector((s) => s.auth);

    const { data, isError } = useQuery({
        queryKey: ['me'],
        queryFn: () => api.get<User>('/auth/me').then((r) => r.data),
        enabled: !!token && !user,
        retry: false,
    });

    useEffect(() => { if (data) dispatch(setUser(data)); }, [data, dispatch]);
    useEffect(() => { if (isError) dispatch(logout()); }, [isError, dispatch]);

    return <>{children}</>;
}
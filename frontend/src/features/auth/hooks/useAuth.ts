import {useMutation} from "@tanstack/react-query";
import {login, logOut, register} from "../auth.api";
import {LoginBody, RegisterBody} from "../auth.types";
import {useAppDispatch} from "../../../store/hooks";
import {logout, setCredentials, switchContext} from "../../../store/user-slice";

export function useLogin() {
    const dispatch = useAppDispatch();
    return useMutation({
        mutationFn: (body: LoginBody) => login(body),
        onSuccess: (data, variables, onMutateResult, context) => {
            dispatch(setCredentials(data))
        },
    });
}

export function useRegister() {
    const dispatch = useAppDispatch();
    return useMutation({
        mutationFn: (body: RegisterBody) => register(body),
        onSuccess: (data, variables, onMutateResult, context) => {
            const first = data.user.memberships[0];
            if (first) dispatch(switchContext(first.company._id));        },
    });
}

export function useLogOut() {
    const dispatch = useAppDispatch();
    return useMutation({
        mutationFn: logOut,
        onSuccess: () => {
            dispatch(logout())
        }
    })
}
import {useMutation} from "@tanstack/react-query";
import {login, register} from "../auth.api";
import {LoginBody, RegisterBody} from "../auth.types";
import {useAppDispatch} from "../../../store/hooks";
import {setCredentials} from "../../../store/user-slice";

export function useLogin() {
    const dispatch=useAppDispatch();
   return useMutation({
        mutationFn:(body:LoginBody)=>login(body),
        onSuccess:(data, variables, onMutateResult, context)=>{
            dispatch(setCredentials(data))
        },
    });
}
export function useRegister() {
    const dispatch=useAppDispatch();
    return useMutation({
        mutationFn:(body:RegisterBody)=>register(body),
        onSuccess:(data, variables, onMutateResult, context)=>{
            dispatch(setCredentials(data))
        },
    });
}
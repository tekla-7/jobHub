import {AuthResponse, LoginBody, RegisterBody} from "./auth.types";
import {api} from "../../core/api";

export const login=async (body:LoginBody)=> {
    const {data}=await api.post<AuthResponse>(
        'auth/login',
        body,
    )
    return data
}

export const register=async (body:RegisterBody)=> {
    const {data}=await api.post<AuthResponse>(
        'auth/register',
        body,
    )
    return data
}
export const logOut=async ()=> {
    const {data}=await api.post('auth/logout')
    return data
}
export const getMe=async ()=>{
    const {data}=await api.get('users/me')
    return data.data
}

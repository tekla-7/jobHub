import {AuthResponse, LoginBody, RegisterBody} from "./auth.types";
import {api} from "../../core/api";

export const login=async (body:LoginBody)=> {
    const {data}=await api.post<AuthResponse>(
        '/api/auth/login',
        body,
    )
    return data
}

export const register=async (body:RegisterBody)=> {
    const {data}=await api.post<AuthResponse>(
        '/api/auth/register',
        body,
    )
    return data
}
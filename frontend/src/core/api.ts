import axios from "axios";
import {BACKEND_API_URL} from "./config";
import {getAuthToken} from "../shared/utils/auth";

export const api = axios.create({
    baseURL: BACKEND_API_URL,
})
api.interceptors.request.use((config) => {
    const token = getAuthToken();
    if (token) config.headers.Authorization = `Bearer ${token}`;
    return config;
})
api.interceptors.response.use(
    (res) => res,
    (err) => {
        const isAuthCall = err.config?.url?.includes('/auth/');
        if (err.response?.status === 401 && !isAuthCall) {
            localStorage.removeItem("token");
            window.location.assign("/login");
        }
        return Promise.reject(err);
    }
)
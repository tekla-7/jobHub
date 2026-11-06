import {AuthResponse, User} from "../features/auth/auth.types";
import {getAuthToken, removeAuthToken, setAuthToken} from "../shared/utils/auth";
import {createSlice, PayloadAction} from "@reduxjs/toolkit";

interface AuthState {
    user: User | null;
    token: string | null;
    ready: boolean;
}

const token = getAuthToken();
const initialState: AuthState = {user: null, token: null, ready: !token,};
const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        setCredentials(state, {payload}: PayloadAction<AuthResponse>) {
            state.user = payload.user;
            state.token = payload.token;
            state.ready = true;
            setAuthToken(payload.token)
        },
        setUser(state, {payload}: PayloadAction<User>) {
            state.user = payload;
            state.ready = true;
        },
        logout(state) {
            state.user = null;
            state.ready = true;
            state.token=null;
            removeAuthToken()
        }
    }
})
export const {setCredentials,setUser,logout} = authSlice.actions;
export default authSlice.reducer;
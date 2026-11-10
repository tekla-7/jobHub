import {AuthResponse, User} from "../features/auth/auth.types";
import {getAuthToken, removeAuthToken, setAuthToken} from "../shared/utils/auth";
import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {ACTIVE_KEY, resolveActiveCompanyId} from "../shared/utils/homeFrom";

interface AuthState {
    user: User | null;
    token: string | null;
    ready: boolean;
    activeCompanyId: string | null;
}

const token = getAuthToken();
const initialState: AuthState = {user: null, token: null, ready: !token,activeCompanyId:null};
const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        setCredentials(state, {payload}: PayloadAction<AuthResponse>) {
            state.user = payload.user;
            state.token = payload.token;
            state.ready = true;
            state.activeCompanyId = resolveActiveCompanyId(payload.user);

            setAuthToken(payload.token)
        },
        setUser(state, {payload}: PayloadAction<User>) {
            state.user = payload;
            state.ready = true;
            state.activeCompanyId = resolveActiveCompanyId(payload);

        },
        switchContext(state, { payload }: PayloadAction<string | null>) {
            state.activeCompanyId = payload;
            if (payload) localStorage.setItem(ACTIVE_KEY, payload);
            else localStorage.removeItem(ACTIVE_KEY);
        },
        logout(state) {
            state.user = null;
            state.activeCompanyId=null;
            state.ready = true;
            state.token=null;
            removeAuthToken();
            localStorage.removeItem(ACTIVE_KEY);
        }
    }
})
export const {setCredentials,setUser,switchContext,logout} = authSlice.actions;
export default authSlice.reducer;
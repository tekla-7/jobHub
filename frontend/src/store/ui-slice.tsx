import {createSlice, PayloadAction} from "@reduxjs/toolkit";

interface Notification {
    status: 'error' | 'success' | 'warning' | 'info',
    title: string,
    message: string
}
interface UiState {
    notification: Notification | null,
    isLoading: boolean,

}
const initialState:UiState = {
    notification: null,
    isLoading: false,
}

const uiSlice = createSlice({
    name: 'ui',
    initialState: initialState,
    reducers: {
        showNotification: (state, action:PayloadAction<Notification>) => {
            state.notification= action.payload
        },
        clearNotification: (state) => {
            state.notification = null;
        },
        setLoading: (state, action) => {
            state.isLoading = action.payload;
        },

    }
})
export const uiAction = uiSlice.actions;
export default uiSlice.reducer
import {configureStore} from "@reduxjs/toolkit";
import userReducer from "../store/user-slice";
import uiReducer from "../store/ui-slice";

const store=configureStore({
    reducer:{
        auth:userReducer,
        ui: uiReducer
}
});
export type RootState=ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;
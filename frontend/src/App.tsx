import React, {useEffect} from 'react'
import './App.css'
import {useSelector} from "react-redux";
import {RootState} from "./core/store.config";
import Notification from "./shared/components/Notification";
import {QueryClientProvider} from "@tanstack/react-query";
import router, {queryClient} from "./routes/router";
import {RouterProvider} from "react-router-dom";
import {useAppDispatch, useAppSelector} from "./store/hooks";
import {useMe} from "./features/auth/queries/auth.queries";
import {logout, setUser} from "./store/user-slice";

function AppContent() {
    const dispatch = useAppDispatch();
    const notification = useSelector((state: RootState) => state.ui.notification);
    const {data, isLoading, isError} = useMe();
    useEffect(() => {
        if (data) {
            console.log(data)
            dispatch(setUser(data));
        }
    }, [data, dispatch]);

    // useEffect(() => {
    //     if (isError) {
    //         dispatch(logout());
    //     }
    // }, [isError, dispatch]);
    return (<>
                {<span id='modal'/>}
                {notification && <Notification/>}
                <RouterProvider router={router}/>
</>
    )
}

export default function App() {
    return (
        <QueryClientProvider client={queryClient}>
            <AppContent />
        </QueryClientProvider>
    );
}
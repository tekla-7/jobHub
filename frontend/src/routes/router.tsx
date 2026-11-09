import {createBrowserRouter} from "react-router-dom";
import RootRedirect from "./RootRedirect";
import React from "react";
import ErrorPage from "../shared/components/Error";
import PublicRoute from "./PublicRoute";
import NotFoundPage from "../shared/components/NotFound";
import AuthLayout from "../features/auth/layout/AuthLayout";
import LoginPage from "../features/auth/LoginPage";
import RegisterPage from "../features/auth/RegisterPage";
import {QueryCache, QueryClient} from "@tanstack/react-query";

const router = createBrowserRouter([
    {
        path: '/',
        element: <RootRedirect/>
    },
    {
        path: '/',
        // element: <RootRedirect to='/' />
        children:[

        ]
    },
    {
        path: '/authentication',
        element: <PublicRoute><AuthLayout/></PublicRoute>,
        errorElement: <ErrorPage/>,
        children: [
            {
                path: 'login',
                element: <LoginPage/>,
                // action: loginAction
            },
            {
                path: 'register',
                element: <RegisterPage/>,
                // action: signUpAction
            }
        //     {
        //         path: 'reset-password',
        //         element: <ResetPassword/>,
        //         action: resetPasswordAction
        //     },
         ]
    },

    {
        path: '*',
        element: <NotFoundPage/>
    },
])
export const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            retry: false,
            refetchOnWindowFocus: false,
        },
    },
    // queryCache: new QueryCache({
    //     onError: (error) => {
    //         if (error instanceof ApiError && error.code === 401 && isAuthenticated()) {
    //             // signOut();
    //         }            }
    //
    // }),
})
export default router;
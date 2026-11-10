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
import {ProtectedRoute} from "./ProtectedRoutes";
import {Placeholder} from "../shared/components/Placeholders";
import PublicLayout from "../shared/layouts/PublicLayout";
import DashboardLayout from "../shared/layouts/DashboardLayout";
import LandingPage from "../features/landing/LandingPage";
const P = (title: string) => <Placeholder title={title} />;

// const router = createBrowserRouter([
//     {
//         path: '/',
//         element: <RootRedirect/>
//     },
//     {
//         path: '/',
//         // element: <RootRedirect to='/' />
//         children:[
//
//         ]
//     },
//     {
//         path: '/',
//         errorElement: <ErrorPage />,
//         children: [
//             { path: 'jobs', element: P('Jobs') },
//             { path: 'jobs/:id', element: P('Job details') },
//             { path: 'companies', element: P('Companies') },
//             { path: 'companies/:id', element: P('Company page') },
//             { path: 'for-employers', element: P('For employers') },
//         ],
//     },
//     {
//         path: '/authentication',
//         element: <PublicRoute><AuthLayout/></PublicRoute>,
//         errorElement: <ErrorPage/>,
//         children: [
//             {
//                 path: 'login',
//                 element: <LoginPage/>,
//                 // action: loginAction
//             },
//             {
//                 path: 'register',
//                 element: <RegisterPage/>,
//                 // action: signUpAction
//             }
//         //     {
//         //         path: 'reset-password',
//         //         element: <ResetPassword/>,
//         //         action: resetPasswordAction
//         //     },
//          ]
//     },
//     {
//         path: '/dashboard',
//         element: <ProtectedRoute context="personal"><DashboardShell /></ProtectedRoute>,
//         errorElement: <ErrorPage />,
//         children: [
//
//             { index: true, element: P('My overview') },
//             { path: 'profile', element: P('My profile') },
//             { path: 'profile/edit', element: P('Edit profile') },
//             { path: 'saved', element: P('Saved jobs') },
//             { path: 'applications', element: P('Applications') },
//             { path: 'settings', element: P('Settings') },
//         ],
//     },
//     {
//         path: '*',
//         element: <NotFoundPage/>
//     },
// ])
const router = createBrowserRouter([
    {
        path: '/',
        element: <PublicLayout />,
        errorElement: <ErrorPage />,
        children: [
            { index: true, element:<LandingPage/>},
            { path: 'jobs', element: P('Jobs') },
            { path: 'jobs/:id', element: P('Job details') },
            { path: 'companies', element: P('Companies') },
            { path: 'companies/:id', element: P('Company page') },
            { path: 'for-employers', element: P('For employers') },
        ],
    },

    //  only allow not login
    {
        path: '/authentication',
        element: <PublicRoute><AuthLayout /></PublicRoute>,
        errorElement: <ErrorPage />,
        children: [
            { path: 'login', element: <LoginPage /> },
            { path: 'register', element: <RegisterPage /> },
            // { path: 'reset-password', element: <ResetPassword /> },
        ],
    },

    // login user
    {
        path: '/dashboard',
        element: <ProtectedRoute context="personal"><DashboardLayout variant="personal" /></ProtectedRoute>,
        errorElement: <ErrorPage />,
        children: [
            { index: true, element: P('My overview') },
            { path: 'profile', element: P('My profile') },
            { path: 'profile/edit', element: P('Edit profile') },
            { path: 'saved', element: P('Saved jobs') },
            { path: 'applications', element: P('Applications') },
            { path: 'settings', element: P('Settings') },
        ],
    },

    //  company
    {
        path: '/employer',
        element: <ProtectedRoute context="company"><DashboardLayout variant="company" /></ProtectedRoute>,
        errorElement: <ErrorPage />,
        children: [
            // owner / admin / recruiter
            { index: true, element: P('Company overview') },
            { path: 'jobs', element: P('My jobs') },
            { path: 'jobs/new', element: P('Create job') },
            { path: 'jobs/:id/applicants', element: P('Applicants') },
            { path: 'company', element: P('Company page') },
            // owner + admin
            { path: 'team', element: <ProtectedRoute context="company" companyRoles={['owner', 'admin']}>{P('Team')}</ProtectedRoute> },
            // owner only
            { path: 'company/edit', element: <ProtectedRoute context="company" companyRoles={['owner']}>{P('Edit company')}</ProtectedRoute> },
        ],
    },

    { path: '*', element: <NotFoundPage /> },
]);
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
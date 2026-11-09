import { Link, useLocation, useNavigate } from 'react-router-dom';
import {useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import React from "react";
import {AuthCard} from "./layout/AuthCard";
import FormField from "../../shared/components/FormField";
import getErrorMessage from "../../shared/utils/errorMessage";
import {useLogin} from "./hooks/useAuth";
import {z} from "zod";
import {homeFor} from "../../shared/utils/homeFrom";
import {alertBox, btnGhost, btnPrimary, linkStrong, orDivider} from "./authStyles";
const schema = z.object({
    email: z.string().email('Enter a valid email'),
    password: z.string().min(1, 'Password is required'),
});
type FormValues = z.infer<typeof schema>;
export default function LoginPage() {
    const navigate=useNavigate();
    const location=useLocation();
    const from = (location.state as { from?: { pathname: string } } | null)?.from?.pathname;
    const { register, handleSubmit, formState: { errors } } = useForm<FormValues>({ resolver: zodResolver(schema) });
    const loginMutation=useLogin();
    const onSubmit = (values: FormValues) => {
        loginMutation.mutate(values, {
            onSuccess: ({ user }) => {
                navigate(from ?? homeFor(user), {
                    replace: true,
                });
            },
        });
    };
    return (
        <AuthCard
            title="Welcome back"
            subtitle="Log in to continue."
            footer={<>Don't have an account? <Link to="/authentication/register" className={linkStrong}>Create one</Link></>}
        >
            {/*<button type="button" className={btnGhost}>*/}
            {/*    <b className="text-[#4285F4]">G</b> Continue with Google*/}
            {/*</button>*/}
            {/*<div className={orDivider}>or with email</div>*/}

            <form onSubmit={handleSubmit(onSubmit)} noValidate>
                {loginMutation.isError && (
                    <div role="alert" className={alertBox}>{getErrorMessage(loginMutation.error)}</div>
                )}
                <FormField
                    label="Email" type="email" placeholder="you@example.com" autoComplete="email"
                    error={errors.email?.message} {...register('email')}
                />
                <FormField
                    label="Password" type="password" placeholder="••••••••" autoComplete="current-password"
                    labelRight={<Link to="/forgot-password" className="font-medium text-[#28508E]">Forgot password?</Link>}
                    error={errors.password?.message} {...register('password')}
                />
                <button type="submit" disabled={loginMutation.isPending} className={btnPrimary}>
                    {loginMutation.isPending ? 'Logging in…' : 'Log In'}
                </button>
            </form>
        </AuthCard>
    );
}
import {z} from "zod";
import {Link, useNavigate} from "react-router-dom";
import {useRegister} from "./hooks/useAuth";
import {zodResolver} from "@hookform/resolvers/zod";
import {useForm} from "react-hook-form";
import {homeFor} from "../../shared/utils/homeFrom";
import React from "react";
import {AuthCard} from "./layout/AuthCard";
import getErrorMessage from "../../shared/utils/errorMessage";
import FormField from "../../shared/components/FormField";
import {alertBox, btnPrimary, linkStrong} from "./authStyles";
import {PATHS} from "../../routes/paths";

const schema = z
    .object({
        role: z.enum(['candidate','employer']),
        fullName: z.string().min(2, 'Enter your full name'),
        email: z.string().email('Enter a valid email'),
        password: z.string().min(8, 'At least 8 characters'),
        confirmPassword: z.string().min(8, 'At least 8 characters'),
        companyName: z.string().optional(),
        terms: z.boolean().refine((v) => v, 'You must accept the terms'),
    })
    .refine((d) => d.role === 'employer' || !!d.companyName?.trim(), {
        path: ['companyName'],
        message: 'Company name is required',
    })
    .refine((d) => d.password &&d.password!==d.confirmPassword , {
        path: ['confirmPassword'],
        message: 'Confirm password is incorrect',
    });
type FormValues = z.infer<typeof schema>;
const ROLES = [
    { value: 'candidate', icon: '👤', title: "I'm looking for a job", text: 'Find and apply to roles' },
    { value: 'employer', icon: '🏢', title: "I'm hiring", text: 'Post jobs, review applicants' },
] as const;
export default function RegisterPage() {
    const navigate = useNavigate();
    const registerUser = useRegister();
    const { register, handleSubmit, watch, setValue, formState: { errors } } = useForm<FormValues>({
        resolver: zodResolver(schema),
        defaultValues: { role: 'candidate', terms: false },
    });
    const role = watch('role');

    const onSubmit = ({ terms, ...body }: FormValues) =>
        registerUser.mutate(body, {
            onSuccess: ({ user }) => navigate(homeFor(user), { replace: true }),
        });

    return (
        <AuthCard
            wide
            title="Create your account"
            subtitle="Choose how you'll use JobHub."
            footer={<>Already have an account? <Link to={PATHS.login} className={linkStrong}>Log in</Link></>}
        >
            <form onSubmit={handleSubmit(onSubmit)} noValidate>
                {registerUser.isError && (
                    <div role="alert" className={alertBox}>{getErrorMessage(registerUser.error)}</div>
                )}

                <div className="mb-6 grid grid-cols-2 gap-3">
                    {ROLES.map((r) => (
                        <button
                            key={r.value}
                            type="button"
                            onClick={() => setValue('role', r.value)}
                            aria-pressed={role === r.value}
                            className={`rounded-[10px] border-[1.5px] px-3.5 py-[18px] text-center text-[#1E2530] ${
                                role === r.value ? 'border-[#28508E] bg-[#E9EEF7]' : 'border-[#E4E7EC] bg-white'
                            }`}
                        >
                            <div className="mb-1.5 text-[22px]">{r.icon}</div>
                            <b className="block text-[13px]">{r.title}</b>
                            <span className="mt-[3px] block text-[11.5px] text-[#667085]">{r.text}</span>
                        </button>
                    ))}
                </div>
                {role === 'employer' && (
                    <div className="mt-5 border-t border-dashed border-[#E4E7EC] pt-5">
                        <FormField
                            label="Company name" placeholder="Tera"
                            hint="This creates your company's public profile on JobHub."
                            error={errors.companyName?.message} {...register('companyName')}
                        />
                    </div>
                )}
                <FormField
                    label="Full name" placeholder="Tekla Kiladze" autoComplete="name"
                    hint={role === 'employer' ? "Your name as a person." : undefined}
                    error={errors.fullName?.message} {...register('fullName')}
                />
                <FormField
                    label="Email" type="email" placeholder="you@example.com" autoComplete="email"
                    error={errors.email?.message} {...register('email')}
                />
                <FormField
                    label="Password" type="password" placeholder="At least 8 characters" autoComplete="new-password"
                    error={errors.password?.message} {...register('password')}
                />
                <FormField label="Confirm password" type="password" placeholder="At least 8 characters"
                           error={errors.confirmPassword?.message}
                           {...register('confirmPassword')} />


<div className='mb-3'>
                <label className="mb-[18px] mt-1.5 flex !mb-0 items-start gap-2 text-[12.5px] text-[#667085]">
                    <input type="checkbox" className="mt-0.5" {...register('terms')} />
                    I agree to the Terms of Service and Privacy Policy
                </label>
                {errors.terms && <p className="-mt-4 mb-3 text-xs text-[#C0392B]">{errors.terms.message}</p>}
            </div>
                <button type="submit" disabled={registerUser.isPending} className={btnPrimary}>
                    {registerUser.isPending ? 'Creating account…' : 'Create Account'}
                </button>
            </form>
        </AuthCard>
    );
}

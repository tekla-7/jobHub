import {z} from "zod";
import {Link, useNavigate} from "react-router-dom";
import {useCreateCompany} from "./useCompanies";
import {useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {PATHS} from "../../routes/paths";
import {AuthCard} from "../auth/layout/AuthCard";
import React from "react";
import {alertBox, btnPrimary, linkStrong} from "../auth/authStyles";
import getErrorMessage from "../../shared/utils/errorMessage";
import FormField from "../../shared/components/FormField";
import {COMPANY_SIZES, INDUSTRIES, sizeLabel} from "./constant";
const schema = z.object({
    name: z.string().trim().min(2, 'Enter your company name'),
    industry: z.string().optional(),
    size: z.string().optional(),
    location: z.string().optional(),
    website: z.string().optional(),
});
type FormValues=z.infer<typeof schema>;
const selectCls = 'w-full rounded-lg border border-[#E4E7EC] bg-white px-3 py-2.5 text-sm text-[#1E2530] outline-none focus:border-[#28508E] focus:ring-[3px] focus:ring-[#E9EEF7]';
export default function CreateCompanyPage(){
    const navigate = useNavigate();
    const create=useCreateCompany();
    const {register,handleSubmit,formState:{errors}}=useForm<FormValues>({resolver:zodResolver(schema)})
    const onSubmit = (v: FormValues) => {
        const body = Object.fromEntries(Object.entries(v).filter(([, val]) => typeof val === 'string' && val.trim() !== '')) as { name: string };
        create.mutate(body, { onSuccess: () => navigate(PATHS.employer, { replace: true }) });
    };

    return (
        <AuthCard
            wide
            title="Create a company"
            subtitle="You'll be its Owner. You can invite teammates and post jobs right after."
            footer={<>Not now? <Link to={PATHS.dashboard} className={linkStrong}>Back to my dashboard</Link></>}
        >
            <form onSubmit={handleSubmit(onSubmit)} noValidate>
                {create.isError && <div role="alert" className={alertBox}>{getErrorMessage(create.error)}</div>}

                <FormField label="Company name" placeholder="JobHub" autoComplete="organization" error={errors.name?.message} {...register('name')} />

                <div className="grid gap-4 sm:grid-cols-2">
                    <div className="mb-4">
                        <label htmlFor="industry" className="mb-1.5 block text-[13px] font-semibold">Industry <span className="font-normal text-[#667085]">(optional)</span></label>
                        <select id="industry" className={selectCls} defaultValue="" {...register('industry')}>
                            <option value="">Select…</option>
                            {INDUSTRIES.map((i) => <option key={i} value={i}>{i}</option>)}
                        </select>
                    </div>
                    <div className="mb-4">
                        <label htmlFor="size" className="mb-1.5 block text-[13px] font-semibold">Company size <span className="font-normal text-[#667085]">(optional)</span></label>
                        <select id="size" className={selectCls} defaultValue="" {...register('size')}>
                            <option value="">Select…</option>
                            {COMPANY_SIZES.map((s) => <option key={s} value={s}>{sizeLabel(s)}</option>)}
                        </select>
                    </div>
                </div>

                <div className="grid gap-x-4 sm:grid-cols-2">
                    <FormField label="Location" placeholder="Tbilisi, Georgia" {...register('location')} />
                    <FormField label="Website" placeholder="jobHub.com" {...register('website')} />
                </div>

                <button type="submit" disabled={create.isPending} className={btnPrimary}>
                    {create.isPending ? 'Creating…' : 'Create company'}
                </button>
            </form>
        </AuthCard>
    );
}
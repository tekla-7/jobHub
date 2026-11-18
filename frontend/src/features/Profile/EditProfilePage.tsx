import {z} from "zod";
import {Profile, ProfileUpdate} from "./type";
import React, {ReactNode} from "react";
import {useNavigate} from "react-router-dom";
import {useProfile, useUpdateProfile} from "./hooks/useProfile";
import {zodResolver} from "@hookform/resolvers/zod";
import {Controller, useFieldArray, useForm, useWatch} from "react-hook-form";
import {PATHS} from "../../routes/paths";
import PageHeader from "../../shared/components/PageHeader";
import FormField from "../../shared/components/FormField";
import FormTextArea from "../../shared/components/FormTextArea";
import CvUpload from "./componetns/CvUpload";
import getErrorMessage from "../../shared/utils/errorMessage";
import SkillsEditor from "./componetns/SkillsEditor";
import ErrorState from "../../shared/components/ErrorState";

const experienceSchema = z
    .object({
        title: z.string().trim().min(1, 'Required'),
        company: z.string().trim().min(1, 'Required'),
        startDate: z.string().min(1, 'Required'),
        endDate: z.string(),
        current: z.boolean(),
        description: z.string().max(1000),
    })
    .refine((e) => e.current || !!e.endDate, { path: ['endDate'], message: 'Add an end date or tick "I currently work here"' })
    .refine((e) => e.current || !e.endDate || e.endDate >= e.startDate, { path: ['endDate'], message: 'End date is before the start date' });

const year = z.string().regex(/^(\d{4})?$/, 'Use a year, e.g. 2021');
const educationSchema = z.object({ degree: z.string().trim().min(1, 'Required'), school: z.string().trim().min(1, 'Required'), startYear: year, endYear: year });

const schema = z.object({
    name: z.string().trim().min(2, 'Enter your name'),
    headline: z.string().max(120, 'Max 120 characters'),
    location: z.string().max(120),
    bio: z.string().max(1000, 'Max 1000 characters'),
    openToWork: z.boolean(),
    skills: z.array(z.string()).max(30, 'Up to 30 skills'),
    experience: z.array(experienceSchema),
    education: z.array(educationSchema),
    contact: z.object({ phone: z.string(), website: z.string(), linkedin: z.string(), visibility: z.enum(['applied', 'all', 'none']) }),
});
type FormValues = z.infer<typeof schema>;


const toDefaults = (p: Profile): FormValues => ({
    name: p.name,
    headline: p.headline ?? '',
    location: p.location ?? '',
    bio: p.bio ?? '',
    openToWork: p.openToWork ?? false,
    skills: p.skills ?? [],

    experience: (p.experience ?? []).map((e) => ({
        title: e.title,
        company: e.company,
        startDate: e.startDate?.slice(0, 7) ?? '',
        endDate: e.endDate?.slice(0, 7) ?? '',
        current: !e.endDate,
        description: e.description ?? '',
    })),

    education: (p.education ?? []).map((e) => ({
        degree: e.degree,
        school: e.school,
        startYear: e.startYear ? String(e.startYear) : '',
        endYear: e.endYear ? String(e.endYear) : '',
    })),

    contact: {
        phone: p.contact?.phone ?? '',
        website: p.contact?.website ?? '',
        linkedin: p.contact?.linkedin ?? '',
        visibility: p.contact?.visibility ?? 'applied',
    },
});



const toPayload = (v: FormValues): ProfileUpdate => ({
    name: v.name.trim(),
    headline: v.headline.trim(),
    location: v.location.trim(),
    bio: v.bio.trim(),
    openToWork: v.openToWork,
    skills: v.skills,

    experience: v.experience.map((e) => ({
        position: e.title.trim(),
        company: e.company.trim(),
        startAt: new Date(`${e.startDate}-01`).toISOString(),
        endAt: e.current || !e.endDate
            ? null
            : new Date(`${e.endDate}-01`).toISOString(),
        description: e.description.trim(),
    })),

    education: v.education.map((e) => ({
        degree: e.degree.trim(),
        institution: e.school.trim(),
        startAt: e.startYear
            ? new Date(`${e.startYear}-01-01`).toISOString()
            : null,
        endAt: e.endYear
            ? new Date(`${e.endYear}-01-01`).toISOString()
            : null,
    })),

    contact: {
        phone: v.contact.phone.trim(),
        website: v.contact.website.trim(),
        linkedin: v.contact.linkedin.trim(),
        visibility: v.contact.visibility,
    },
});


function FormCard({ title, hint, action, children }: { title: string; hint?: string; action?: ReactNode; children: ReactNode }) {
    return (
        <section className="mb-4 rounded-[10px] border border-[#E4E7EC] bg-white p-6">
            <div className="mb-4 flex items-start justify-between gap-3">
                <div>
                    <h2 className="text-[15px] font-bold">{title}</h2>
                    {hint && <p className="mt-0.5 text-[12.5px] text-[#667085]">{hint}</p>}
                </div>
                {action}
            </div>
            {children}
        </section>
    );
}

const addBtn = 'rounded-lg border border-[#E4E7EC] bg-white px-3.5 py-2 text-[13px] font-semibold hover:bg-[#F8F9FB]';
const selectCls = 'w-full rounded-lg border border-[#E4E7EC] bg-white px-3 py-2.5 text-sm outline-none focus:border-[#28508E] focus:ring-[3px] focus:ring-[#E9EEF7]';

function AvatarUpload(props: { name: string, src: string | undefined }) {
    return null;
}

function EditProfileForm({ profile }: { profile: Profile }) {
    const navigate = useNavigate();
    const update = useUpdateProfile();
    const { register, control, handleSubmit, setValue, formState: { errors, isDirty } } = useForm<FormValues>({
        resolver: zodResolver(schema),
        defaultValues: toDefaults(profile),
    });
    const experience = useFieldArray({ control, name: 'experience' });
    const education = useFieldArray({ control, name: 'education' });
    const expValues = useWatch({ control, name: 'experience' });
    const bio = useWatch({ control, name: 'bio' }) ?? '';

    const back = () => navigate(`${PATHS.dashboard}/profile`);
    const cancel = () => { if (!isDirty || window.confirm('Discard your changes?')) back(); };
    const onSubmit = (v: FormValues) =>
        update.mutate(toPayload(v), { onSuccess: () => navigate(`${PATHS.dashboard}/profile`, { state: { saved: true } }) });

    return (
        <form onSubmit={handleSubmit(onSubmit)} noValidate className="mx-auto max-w-[860px]">
            <PageHeader title="Edit profile" subtitle="Changes appear on the profile employers see." />

            <FormCard title="Profile photo" hint="A clear, friendly photo helps employers recognise you. It uploads right away.">
                <AvatarUpload name={profile.name} src={profile.avatarUrl} />
            </FormCard>

            <FormCard title="Basic information">
                <div className="grid gap-x-4 sm:grid-cols-2">
                    <FormField label="Full name" autoComplete="name" error={errors.name?.message} {...register('name')} />
                    <FormField label="Location" placeholder="Tbilisi, Georgia" error={errors.location?.message} {...register('location')} />
                </div>
                <FormField label="Professional headline" placeholder="Frontend Developer" error={errors.headline?.message} {...register('headline')} />
                <label className="flex cursor-pointer items-center gap-2 text-sm font-medium">
                    <input type="checkbox" className="h-4 w-4 accent-[#28508E]" {...register('openToWork')} />
                    Show an "Open to work" badge on my profile
                </label>
            </FormCard>

            <FormCard title="About">
                <FormTextArea label="Short bio" placeholder="A few sentences about your experience and what you're looking for." error={errors.bio?.message} {...register('bio')} />
                <p className="-mt-3 text-right text-xs text-[#667085]">{bio.length}/1000</p>
            </FormCard>

            <FormCard title="Skills" hint="Employers can find you by these.">
                <Controller control={control} name="skills" render={({ field }) => <SkillsEditor value={field.value} onChange={field.onChange} />} />
                {errors.skills?.message && <p className="mt-2 text-xs text-[#C0392B]">{errors.skills.message}</p>}
            </FormCard>

            <FormCard
                title="Work experience"
                hint="Your years of experience are calculated from these dates."
                action={<button type="button" className={addBtn} onClick={() => experience.append({ title: '', company: '', startDate: '', endDate: '', current: false, description: '' })}>+ Add</button>}
            >
                {experience.fields.length === 0 && <p className="text-sm text-[#667085]">No work experience added yet.</p>}
                {experience.fields.map((f, i) => {
                    const current = expValues?.[i]?.current;
                    const err = errors.experience?.[i];
                    return (
                        <div key={f.id} className="mb-5 rounded-lg border border-[#E4E7EC] p-4 last:mb-0">
                            <div className="grid gap-x-4 sm:grid-cols-2">
                                <FormField label="Job title" error={err?.title?.message} {...register(`experience.${i}.title`)} />
                                <FormField label="Company" error={err?.company?.message} {...register(`experience.${i}.company`)} />
                                <FormField label="Start date" type="month" error={err?.startDate?.message} {...register(`experience.${i}.startDate`)} />
                                <FormField label="End date" type="month" disabled={current} error={err?.endDate?.message} {...register(`experience.${i}.endDate`)} />
                            </div>
                            <label className="mb-4 flex cursor-pointer items-center gap-2 text-[13px] font-medium">
                                <input
                                    type="checkbox"
                                    className="h-4 w-4 accent-[#28508E]"
                                    {...register(`experience.${i}.current`, { onChange: (e) => { if (e.target.checked) setValue(`experience.${i}.endDate`, ''); } })}
                                />
                                I currently work here
                            </label>
                            <FormTextArea label="Description (optional)" error={err?.description?.message} {...register(`experience.${i}.description`)} />
                            <button type="button" onClick={() => experience.remove(i)} className="text-[13px] font-semibold text-[#C0392B] hover:underline">Remove this job</button>
                        </div>
                    );
                })}
            </FormCard>

            <FormCard
                title="Education"
                action={<button type="button" className={addBtn} onClick={() => education.append({ degree: '', school: '', startYear: '', endYear: '' })}>+ Add</button>}
            >
                {education.fields.length === 0 && <p className="text-sm text-[#667085]">No education added yet.</p>}
                {education.fields.map((f, i) => {
                    const err = errors.education?.[i];
                    return (
                        <div key={f.id} className="mb-5 rounded-lg border border-[#E4E7EC] p-4 last:mb-0">
                            <div className="grid gap-x-4 sm:grid-cols-2">
                                <FormField label="Degree / course" error={err?.degree?.message} {...register(`education.${i}.degree`)} />
                                <FormField label="School" error={err?.school?.message} {...register(`education.${i}.school`)} />
                                <FormField label="Start year" inputMode="numeric" placeholder="2017" error={err?.startYear?.message} {...register(`education.${i}.startYear`)} />
                                <FormField label="End year" inputMode="numeric" placeholder="2021" hint="Leave empty if you're still studying" error={err?.endYear?.message} {...register(`education.${i}.endYear`)} />
                            </div>
                            <button type="button" onClick={() => education.remove(i)} className="text-[13px] font-semibold text-[#C0392B] hover:underline">Remove</button>
                        </div>
                    );
                })}
            </FormCard>

            <FormCard title="CV" hint="Employers can download it from your profile. It uploads right away.">
                <CvUpload cvName={profile.cvName} cvUrl={profile.cvUrl} />
            </FormCard>

            <FormCard title="Contact information" hint="Your email comes from your account. You can change it in Settings.">
                <div className="grid gap-x-4 sm:grid-cols-2">
                    <FormField label="Phone" type="tel" autoComplete="tel" {...register('contact.phone')} />
                    <FormField label="Website / portfolio" placeholder="yourname.dev" {...register('contact.website')} />
                    <FormField label="LinkedIn" placeholder="linkedin.com/in/you" {...register('contact.linkedin')} />
                    <div className="mb-4">
                        <label htmlFor="visibility" className="mb-1.5 block text-[13px] font-semibold">Who can see my contact details</label>
                        <select id="visibility" className={selectCls} {...register('contact.visibility')}>
                            <option value="applied">Only employers I apply to</option>
                            <option value="all">All employers</option>
                            <option value="none">Nobody</option>
                        </select>
                    </div>
                </div>
            </FormCard>

            {update.isError && <div role="alert" className="mb-4 rounded-lg bg-[#FBE7E4] px-4 py-3 text-[13px] text-[#C0392B]">{getErrorMessage(update.error)}</div>}

            <div className="sticky bottom-0 z-10 -mx-4 mt-6 flex justify-end gap-2.5 border-t border-[#E4E7EC] bg-white/95 px-4 py-3 backdrop-blur lg:-mx-8 lg:px-8">
                <button type="button" onClick={cancel} className="rounded-lg border border-[#E4E7EC] bg-white px-4 py-2.5 text-sm font-semibold hover:bg-[#F8F9FB]">Cancel</button>
                <button type="submit" disabled={update.isPending} className="rounded-lg bg-[#28508E] px-5 py-2.5 text-sm font-semibold text-white hover:bg-[#1E3E70] disabled:opacity-60">
                    {update.isPending ? 'Saving…' : 'Save changes'}
                </button>
            </div>
        </form>
    );
}

export default function EditProfilePage() {
    const { data, isPending, isError, refetch } = useProfile();
    if (isError) return <ErrorState onRetry={refetch} />;
    if (isPending) return <div className="mx-auto max-w-[860px] space-y-4" aria-hidden>{[120, 160, 140, 200].map((h, i) => <div key={i} style={{ height: h }} className="animate-pulse rounded-[10px] bg-[#EEF0F2]" />)}</div>;
    return <EditProfileForm profile={data} />; // the form starts only once the data is there, so defaultValues are right
}

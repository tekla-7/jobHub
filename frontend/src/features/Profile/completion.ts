import {Profile} from "./type";

export interface CompletionItem { key: string; label: string; done: boolean }

export function profileCompletion(p: Profile): { percent: number; items: CompletionItem[] } {
    console.log(p)
    const items: CompletionItem[] = [
        { key: 'photo', label: 'Add a profile photo', done: !!p.avatarUrl },
        { key: 'headline', label: 'Add a professional headline', done: !!p.headline?.trim() },
        { key: 'location', label: 'Add your location', done: !!p.location?.trim() },
        { key: 'bio', label: 'Write a short bio', done: (p.bio?.trim().length ?? 0) >= 30 },
        { key: 'skills', label: 'Add at least 3 skills', done: p.skills.length >= 3 },
        { key: 'experience', label: 'Add your work experience', done: p.experience.length > 0 },
        { key: 'education', label: 'Add your education', done: p.education.length > 0 },
        { key: 'cv', label: 'Upload your CV', done: !!p.cvUrl },
    ];
    const done = items.filter((i) => i.done).length;
    return { percent: Math.round((done / items.length) * 100), items };
}

export interface Experience {
    title: string;
    company: string;
    startDate: string;
    endDate: string | null;
    description?: string;
}

export interface Education {
    degree: string;
    school: string;
    startYear?: number;
    endYear?: number | null;
}

export type ContactVisibility = 'applied' | 'all' | 'none';

export interface Profile {
    name: string;
    email: string;
    avatarUrl?: string;
    headline?: string;
    location?: string;
    bio?: string;
    openToWork: boolean;
    skills: string[];
    experience: Experience[];
    education: Education[];
    cvUrl?: string;
    cvName?: string;
    contact: { phone?: string; website?: string; linkedin?: string; visibility: ContactVisibility };
}

export type ProfileUpdate = Omit<Profile, 'email' | 'avatarUrl' | 'cvUrl' | 'cvName'>;

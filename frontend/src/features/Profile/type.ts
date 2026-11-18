
export interface Experience {
    position: string;
    company: string;
    startAt: string;
    endAt: string | null;
    description?: string;
}

export interface Education {
    institution: string;
    degree: string;
    fieldOfStudy?: string;
    startAt?: string | null;
    endAt?: string | null;
}

export type ContactVisibility = 'applied' | 'all' | 'none';

export interface Profile {
    _id: string;
    user: string;
    name: string;
    email: string;
    phone: string;
    LinkedIn: string;
    location: string;
    bio: string;
    headline: string;
    about: string;
    skills: string[];
    openToWork: boolean;
    experience: Experience[];
    education: Education[];
    profileImg: string;
    cv: string;
    website:string;
    profilePublicId: string;
    cvPublicId: string;
    contactVisibility: ContactVisibility;
    createdAt: string;
    updatedAt: string;
}

export interface ProfileUpdate {
    name: string;
    headline: string;
    location: string;
    bio: string;
    openToWork: boolean;
    skills: string[];
    experience: Experience[];
    education: Education[];
    contact: {
        phone: string;
        website: string;
        linkedin: string;
        visibility: ContactVisibility;
    };
}

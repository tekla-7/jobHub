export type ApplicationStatus = 'applied' | 'reviewing' | 'interview' | 'hired' | 'rejected';

export interface ApplicationJob {
    _id: string;
    title: string;
    location: string;
    company: { _id: string; name: string; logo?: string };
}

export interface Application {
    _id: string;
    job: ApplicationJob | null;
    status: ApplicationStatus;
    coverNote?: string;
    createdAt: string;
    updatedAt: string;
}

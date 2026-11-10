export interface Job {
    _id: string;
    title: string;
    company: {
        _id:string,
        name:string,
        logo:string,
    };
    companyLogo?: string;
    location: string;
    workplaceType: 'Remote' | 'Hybrid' | 'On-site';
    type: string;
    salary: string;
    skills: string[];
    postedAt: string;
}

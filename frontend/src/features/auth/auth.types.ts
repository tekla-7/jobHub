export interface AuthResponse {
    user: User;
    token: string;
}

export interface LoginBody {
    email: string;
    password: string;
}

export interface RegisterBody {
    fullName: string;
    email: string;
    password: string;
    confirmPassword: string;
    companyName?: string;
}

export interface User {
    _id: string;
    name: string;
    email: string;
    memberships: Membership[];

}

export interface Membership {
    _id: string;

    company: Company,
    role: CompanyRole
}
export interface Company {
    _id: string,
    name: string,
    logo: string
}
export type CompanyRole = 'owner' | 'admin' | 'recruiter';
// Owner — full access, billing, can remove anyone,deactivate,edit profile
// Admin — manage jobs, applicants, and invite teammates
// Recruiter — manage jobs and applicants only
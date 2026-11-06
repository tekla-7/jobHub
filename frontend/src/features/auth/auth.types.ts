export interface AuthResponse {
    user:User;
    token:string;
}
export interface LoginBody {
    email:string;
    password:string;
}
export interface RegisterBody {
    fullName:string;
    email:string;
    password:string;
    confirmPassword:string;
    companyName?:string;
}
export interface User {
    id:string;
    name:string;
    email:string;
    role:Role;

}
export type Role =''
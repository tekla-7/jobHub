export function homeFor(user: any): string {
    if (user.role === 'admin') return '/admin';
    if (user.role === 'employer') return '/employer';
    return '/dashboard';
}
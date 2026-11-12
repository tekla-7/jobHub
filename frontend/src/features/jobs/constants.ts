export const DEPARTMENTS = ['engineering', 'design', 'marketing', 'sales', 'product', 'finance'] as const;
export const EMPLOYMENT_TYPES = ['full-time', 'part-time', 'contract', 'internship'] as const;
export const WORKPLACE_TYPES = ['remote', 'hybrid', 'on-site'] as const;

export const OPEN_JOB_STATUS = 'active';

export const SORT_OPTIONS = [
    { value: 'newest', label: 'Newest' },
    { value: 'salary_desc', label: 'Salary: high to low' },
    { value: 'salary_asc', label: 'Salary: low to high' },
] as const;
export type SortKey = (typeof SORT_OPTIONS)[number]['value'];

export const PAGE_SIZE = 10;
export const labelOf = (v: string) => v.charAt(0).toUpperCase() + v.slice(1).replace(/_/g, ' ');

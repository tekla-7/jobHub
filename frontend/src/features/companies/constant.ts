export const INDUSTRIES = ['Fintech', 'Software', 'Banking', 'Logistics', 'Design', 'Real Estate', 'Other'] as const;
export const COMPANY_SIZES = ['1–10', '11–50', '51–200', '201–500', '500+'] as const;
export const COMPANIES_PAGE_SIZE = 12;

export const sizeLabel = (s: string) => (/employees/i.test(s) ? s : `${s} employees`);
export const websiteHref = (w: string) => (w.startsWith('http') ? w : `https://${w}`);

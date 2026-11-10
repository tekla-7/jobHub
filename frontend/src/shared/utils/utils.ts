export const initialsOf = (name: string) =>
    name.split(' ').filter(Boolean).map((p) => p[0]).slice(0, 2).join('').toUpperCase();

export const cap = (s: string) => s.charAt(0).toUpperCase() + s.slice(1);
export const initialsOf = (name?: string | null): string => {
    if (!name?.trim()) return "U";

    return name
        .trim()
        .split(/\s+/)
        .map((part) => part[0])
        .slice(0, 2)
        .join("")
        .toUpperCase();
};

export const cap = (s?: string | null): string => {
    if (!s?.trim()) return "";

    return s.charAt(0).toUpperCase() + s.slice(1);
};

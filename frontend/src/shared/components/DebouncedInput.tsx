import {InputHTMLAttributes, useEffect, useState} from "react";
import {input} from "zod";

const base =
    'w-full rounded-lg border border-[#E4E7EC] bg-white px-3 py-2.5 text-sm text-[#1E2530] outline-none placeholder:text-[#98A2B3] focus:border-[#28508E] focus:ring-[3px] focus:ring-[#E9EEF7]';

interface Props extends Omit<InputHTMLAttributes<HTMLInputElement>, 'value' | 'onChange'> {
    value: string;
    onCommit: (v: string) => void;
    delay?: number;
}


export default function DebouncedInput({ value, onCommit, delay = 400, className, ...rest }: Props) {
    const [v, setV] = useState(value);
    useEffect(() => setV(value), [value]);
    useEffect(() => {
        if (v === value) return;
        const t = setTimeout(() => onCommit(v), delay);
        return () => clearTimeout(t);
    }, [v]);
    return <input {...rest} value={v} onChange={(e) => setV(e.target.value)} className={className ?? base} />;

}

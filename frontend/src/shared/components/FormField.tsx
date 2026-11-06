import {InputHTMLAttributes, ReactNode, Ref} from "react";

interface Props extends InputHTMLAttributes<HTMLInputElement> {
    ref?:Ref<HTMLInputElement>
    label: string;
    error?: string;
    hint?: string;
    labelRight?: ReactNode;
}

export default function  FormField({ref, label, error, hint, labelRight, id, ...rest }:Props) {
    const inputId = id ?? rest.name;
    return (
        <div className="mb-4">
            <label htmlFor={inputId} className="mb-1.5 flex justify-between text-[13px] font-semibold">
                {label}
                {labelRight}
            </label>
            <input
                ref={ref}
                id={inputId}
                aria-invalid={!!error}
                aria-describedby={error ? `${inputId}-err` : undefined}
                className={`w-full rounded-lg border bg-white px-3 py-2.5 text-sm text-[#1E2530] outline-none placeholder:text-[#98A2B3] focus:ring-[3px] focus:ring-[#E9EEF7] ${
                    error ? 'border-[#C0392B]' : 'border-[#E4E7EC] focus:border-[#28508E]'
                }`}
                {...rest}
            />
            {hint && !error && <p className="mt-1.5 text-xs text-ink-soft">{hint}</p>}
            {error && <p id={`${inputId}-err`} className="mt-1.5 text-xs text-bad">{error}</p>}
        </div>
    );
};

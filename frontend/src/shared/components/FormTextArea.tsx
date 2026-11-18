import {forwardRef, TextareaHTMLAttributes} from "react";

interface Props extends TextareaHTMLAttributes<HTMLTextAreaElement> { label: string; error?: string; hint?: string }

const FormTextArea = forwardRef<HTMLTextAreaElement, Props>(({ label, error, hint, id, ...rest }, ref) => {
    const inputId = id ?? rest.name;
    return (
        <div className="mb-4">
            <label htmlFor={inputId} className="mb-1.5 block text-[13px] font-semibold">{label}</label>
            <textarea
                ref={ref}
                id={inputId}
                aria-invalid={!!error}
                className={`min-h-[100px] w-full resize-y rounded-lg border bg-white px-3 py-2.5 text-sm text-[#1E2530] outline-none placeholder:text-[#98A2B3] focus:ring-[3px] focus:ring-[#E9EEF7] ${error ? 'border-[#C0392B]' : 'border-[#E4E7EC] focus:border-[#28508E]'}`}
                {...rest}
            />
            {hint && !error && <p className="mt-1.5 text-xs text-[#667085]">{hint}</p>}
            {error && <p className="mt-1.5 text-xs text-[#C0392B]">{error}</p>}
        </div>
    );
});
FormTextArea.displayName = 'FormTextArea';
export default FormTextArea;
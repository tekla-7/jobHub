import {ReactNode} from "react";

export function AuthCard({
  title, subtitle, footer, wide, children,
}: { title: string; subtitle?: string; footer: ReactNode; wide?: boolean; children: ReactNode }) {
  return (
    <>
        <div
            className={`w-full ${wide ? 'max-w-[460px]' : 'max-w-[420px]'} rounded-[18px] border border-[#E4E7EC] bg-white px-5 py-[26px] shadow-[0_20px_50px_rgba(30,62,112,0.10)] sm:p-[34px]`}
        >
            <h1 className="m-0 text-[22px] font-bold tracking-tight">{title}</h1>
            {subtitle && <p className="mb-[22px] mt-1.5 text-[13.5px] text-[#667085]">{subtitle}</p>}
            {children}
        </div>
        <p className="mt-5 text-[13.5px] text-[#667085]">{footer}</p>
    </>
  );
}
import React from "react";
import {Link,Outlet} from "react-router-dom";


export default function AuthLayout() {
    return (
        <div className="relative w-full flex min-h-screen flex-col items-center justify-center overflow-hidden bg-[#F8F9FB] bg-[radial-gradient(circle_at_15%_20%,#DCE6F6_0,transparent_38%),radial-gradient(circle_at_85%_80%,#E6ECF7_0,transparent_40%)] px-5 py-10 text-[#1E2530]">
            <div
                aria-hidden
                className="pointer-events-none absolute inset-0 opacity-50 bg-[radial-gradient(#CBD3E0_1px,transparent_1px)] bg-[length:22px_22px] [-webkit-mask-image:radial-gradient(ellipse_at_center,transparent_30%,#000_100%)] [mask-image:radial-gradient(ellipse_at_center,transparent_30%,#000_100%)]"
            />
            <Link to="/" className="relative mb-[22px] text-[22px] font-extrabold text-[#1E2530]">
                Job<span className="text-[#28508E]">Hub</span>
            </Link>
            <main className="relative flex w-full flex-col items-center">
                <Outlet />
            </main>
        </div>
    );
}
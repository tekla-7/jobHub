import React from "react";
import {Outlet} from "react-router-dom";
import Header from "../components/Header";


export default function PublicLayout() {
    return (
        <div className="flex min-h-screen flex-col bg-[#F8F9FB] text-[#1E2530]">
            <Header />
            <main className="flex-1">
                <Outlet />
            </main>
            <footer className="mt-16 border-t border-[#E4E7EC]">
                <div className="mx-auto flex max-w-[1160px] flex-wrap items-center justify-between gap-3 px-6 py-7 text-[13px] text-[#667085]">
                    <span>© {new Date().getFullYear()} JobHub</span>
                    <span>Product · Company · Resources · Legal</span>
                </div>
            </footer>
        </div>
    );
}

import {useEffect} from "react";
import {useLocation} from "react-router-dom";

export default function ScrollManager() {
    const { pathname, hash, key } = useLocation();

    useEffect(() => {
        if (!hash) window.scrollTo(0, 0);
    }, [pathname]);

    useEffect(() => {
        if (!hash) return;
        const id = decodeURIComponent(hash.slice(1));
        const t = setTimeout(() => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' }), 0);
        return () => clearTimeout(t);
    }, [hash, key]);

    return null;
}
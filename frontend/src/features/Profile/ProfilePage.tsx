
import { useProfile } from "./hooks/useProfile";
import { Link, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import { PATHS } from "../../routes/paths";
import PageHeader from "../../shared/components/PageHeader";
import ErrorState from "../../shared/components/ErrorState";
import ProfileView from "./componetns/ProfileView";

export default function ProfilePage() {
    const { data, isPending, isError, refetch } = useProfile();
    const location = useLocation();

    const [showSaved, setShowSaved] = useState(
        !!(location.state as { saved?: boolean } | null)?.saved
    );

    useEffect(() => {
        if (location.state?.saved) {
            window.history.replaceState({}, document.title);
        }
    }, [location.state]);

    const editLink = (
        <Link
            to={`${PATHS.dashboard}/profile/edit`}
            className="rounded-lg bg-[#28508E] px-4 py-2.5 text-sm font-semibold text-white hover:bg-[#1E3E70]"
        >
            Edit profile
        </Link>
    );

    return (
        <div className="mx-auto max-w-[860px]">
            <PageHeader
                title="My profile"
                subtitle="This is how employers see your profile."
                action={editLink}
            />

            {showSaved && (
                <div
                    role="status"
                    className="mb-4 flex items-center justify-between rounded-lg bg-[#E3F5EC] px-4 py-3 text-[13.5px] font-medium text-[#12805C]"
                >
                    Profile saved.
                    <button
                        type="button"
                        onClick={() => setShowSaved(false)}
                        aria-label="Dismiss"
                    >
                        ✕
                    </button>
                </div>
            )}

            {isError ? (
                <ErrorState onRetry={refetch} />
            ) : isPending ? (
                <div className="space-y-4" aria-hidden>
                    {[140, 90, 160, 90].map((h, i) => (
                        <div
                            key={i}
                            style={{ height: h }}
                            className="animate-pulse rounded-[10px] bg-[#EEF0F2]"
                        />
                    ))}
                </div>
            ) : (
                <ProfileView profile={data} />
            )}
        </div>
    );
}

import { useAuth, useUser } from "@clerk/clerk-react";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
    const { isLoaded, isSignedIn } = useAuth();
    const { user } = useUser();

    if (!isLoaded) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-slate-50">
                <div className="flex flex-col items-center gap-3">
                    <div className="h-8 w-8 rounded-full border-4 border-sky-500 border-t-transparent animate-spin" />
                    <p className="text-slate-500 text-sm">Loading...</p>
                </div>
            </div>
        );
    }

    if (!isSignedIn) return <Navigate to="/" replace />; // Redirect non-logged in users to home

    // Admin email validation
    const allowedEmails = (import.meta.env.VITE_ADMIN_EMAILS || "")
        .split(",")
        .map((e: string) => e.trim().toLowerCase());

    const userEmail = user?.primaryEmailAddress?.emailAddress?.trim().toLowerCase();

    if (!userEmail || !allowedEmails.includes(userEmail)) {
        // Rediect logged-in but unauthorized users to home
        return <Navigate to="/" replace />;
    }

    return <>{children}</>;
};

export default ProtectedRoute;
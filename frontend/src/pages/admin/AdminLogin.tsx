import { SignIn, useAuth } from "@clerk/clerk-react";
import { Navigate } from "react-router-dom";

const AdminLogin = () => {
    const { isSignedIn, isLoaded } = useAuth();

    if (!isLoaded) return null;
    if (isSignedIn) return <Navigate to="/admin" replace />;

    return (
        <div
            className="min-h-screen flex flex-col items-center justify-center px-4 py-12"
            style={{
                background: "linear-gradient(135deg, #f0f9ff 0%, #e0f2fe 40%, #f8fafc 100%)",
            }}
        >
            {/* Decorative background blobs */}
            <div
                className="fixed top-0 left-0 w-full h-full pointer-events-none overflow-hidden"
                aria-hidden="true"
            >
                <div
                    className="absolute -top-32 -left-32 w-96 h-96 rounded-full opacity-20"
                    style={{ background: "radial-gradient(circle, #38bdf8, transparent)" }}
                />
                <div
                    className="absolute -bottom-32 -right-32 w-96 h-96 rounded-full opacity-20"
                    style={{ background: "radial-gradient(circle, #0ea5e9, transparent)" }}
                />
            </div>

            {/* Branding */}
            <div className="relative z-10 mb-8 flex flex-col items-center gap-4 text-center">
                {/* Logo mark */}
                <div className="relative">
                    <div className="w-20 h-20 rounded-2xl flex items-center justify-center bg-white border border-sky-100 shadow-lg p-1"
                        style={{ boxShadow: "0 8px 24px rgba(14, 165, 233, 0.20)" }}
                    >
                        <img src="/logo.png" alt="JK Electricals" className="w-full h-full object-contain" />
                    </div>
                </div>

                <div>
                    <h1
                        className="text-2xl font-extrabold tracking-tight"
                        style={{ color: "#0c4a6e" }}
                    >
                        JK Electricals
                    </h1>
                    <p className="text-sm font-medium text-sky-600 mt-0.5 uppercase tracking-widest">
                        Admin Portal
                    </p>
                </div>

                <p className="text-slate-500 text-sm max-w-xs leading-relaxed">
                    Sign in to manage contact submissions and monitor enquiries.
                </p>
            </div>

            {/* Clerk SignIn with full appearance customisation */}
            <div className="relative z-10 w-full max-w-md">
                <SignIn
                    routing="hash"
                    afterSignInUrl="/admin"
                    appearance={{
                        layout: {
                            showOptionalFields: false,
                        },
                        variables: {
                            colorPrimary: "#0ea5e9",
                            colorBackground: "#ffffff",
                            colorText: "#1e293b",
                            colorTextSecondary: "#64748b",
                            colorInputBackground: "#f8fafc",
                            colorInputText: "#1e293b",
                            borderRadius: "12px",
                            fontFamily: "inherit",
                            fontSize: "14px",
                        },
                        elements: {
                            // Card
                            card: {
                                boxShadow: "0 4px 32px rgba(14, 165, 233, 0.10), 0 1px 4px rgba(0,0,0,0.06)",
                                border: "1px solid #e0f2fe",
                                borderRadius: "20px",
                                padding: "32px",
                            },
                            // Hide default Clerk header (we have our own branding above)
                            headerTitle: { display: "none" },
                            headerSubtitle: { display: "none" },
                            header: { display: "none" },

                            // Form fields
                            formFieldLabel: {
                                color: "#475569",
                                fontWeight: "600",
                                fontSize: "13px",
                            },
                            formFieldInput: {
                                borderRadius: "10px",
                                border: "1.5px solid #e2e8f0",
                                backgroundColor: "#f8fafc",
                                color: "#1e293b",
                                fontSize: "14px",
                                padding: "10px 14px",
                                transition: "border-color 0.2s, box-shadow 0.2s",
                            },
                            formFieldInputShowPasswordButton: {
                                color: "#94a3b8",
                            },

                            // Primary button
                            formButtonPrimary: {
                                background: "linear-gradient(135deg, #0ea5e9 0%, #38bdf8 100%)",
                                borderRadius: "10px",
                                fontWeight: "700",
                                fontSize: "14px",
                                letterSpacing: "0.01em",
                                padding: "11px 24px",
                                boxShadow: "0 4px 12px rgba(14, 165, 233, 0.30)",
                                transition: "all 0.2s ease",
                                border: "none",
                            },

                            // Social buttons
                            socialButtonsBlockButton: {
                                border: "1.5px solid #e2e8f0",
                                borderRadius: "10px",
                                backgroundColor: "#ffffff",
                                color: "#334155",
                                fontWeight: "600",
                                fontSize: "13px",
                                transition: "border-color 0.2s, background 0.2s",
                            },
                            socialButtonsBlockButtonText: {
                                fontWeight: "600",
                            },

                            // Divider
                            dividerLine: { backgroundColor: "#e2e8f0" },
                            dividerText: { color: "#94a3b8", fontSize: "12px" },

                            // Footer links (Hide Sign Up)
                            footerAction: { display: "none" },
                            footerActionLink: { display: "none" },
                            footerActionText: { display: "none" },

                            // Identity preview
                            identityPreviewText: { color: "#334155" },
                            identityPreviewEditButton: { color: "#0ea5e9" },
                        },
                    }}
                />
            </div>

            {/* Footer */}
            <p className="relative z-10 mt-8 text-xs text-slate-400 text-center">
                © {new Date().getFullYear()} JK Electricals · Super Grade Electrical Contractor
            </p>
        </div>
    );
};

export default AdminLogin;
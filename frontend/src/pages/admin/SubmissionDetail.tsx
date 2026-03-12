import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useAuth } from "@clerk/clerk-react";
import { ArrowLeft, Trash2, Mail, Phone, Briefcase, MessageSquare, Clock, CheckCircle2, Inbox } from "lucide-react";
import { format } from "date-fns";
import { fetchSubmission, updateStatus, deleteSubmission } from "@/lib/adminApi";

const statusStyles: Record<string, string> = {
    unread: "bg-sky-100 text-sky-700 border-sky-200",
    in_progress: "bg-amber-100 text-amber-700 border-amber-200",
    resolved: "bg-green-100 text-green-700 border-green-200",
};

const statusOptions = [
    { value: "unread", label: "Unread", icon: Inbox },
    { value: "in_progress", label: "In Progress", icon: Clock },
    { value: "resolved", label: "Resolved", icon: CheckCircle2 },
];

const emailLogStyles: Record<string, string> = {
    delivered: "bg-green-50 text-green-700",
    failed: "bg-red-50 text-red-700",
    sent: "bg-sky-50 text-sky-700",
};

const SubmissionDetail = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const { getToken } = useAuth();

    const [submission, setSubmission] = useState<any>(null);
    const [loading, setLoading] = useState(true);
    const [updating, setUpdating] = useState(false);
    const [deleting, setDeleting] = useState(false);
    const [confirmDelete, setConfirmDelete] = useState(false);
    const [error, setError] = useState("");

    useEffect(() => {
        const load = async () => {
            try {
                setLoading(true);
                const token = await getToken();
                const res = await fetchSubmission(token!, id!);
                setSubmission(res.data);
            } catch (err: any) {
                setError(err.message || "Failed to load submission.");
            } finally {
                setLoading(false);
            }
        };
        load();
    }, [id, getToken]);

    const handleStatusChange = async (newStatus: string) => {
        try {
            setUpdating(true);
            const token = await getToken();
            const res = await updateStatus(token!, id!, newStatus);
            setSubmission((prev: any) => ({ ...prev, status: res.data.status, updated_at: res.data.updated_at }));
        } catch (err: any) {
            setError(err.message || "Failed to update status.");
        } finally {
            setUpdating(false);
        }
    };

    const handleDelete = async () => {
        try {
            setDeleting(true);
            const token = await getToken();
            await deleteSubmission(token!, id!);
            navigate("/admin");
        } catch (err: any) {
            setError(err.message || "Failed to delete.");
            setDeleting(false);
        }
    };

    if (loading) {
        return (
            <div className="min-h-screen bg-slate-50 flex items-center justify-center">
                <div className="h-8 w-8 rounded-full border-4 border-sky-500 border-t-transparent animate-spin" />
            </div>
        );
    }

    if (error || !submission) {
        return (
            <div className="min-h-screen bg-slate-50 flex flex-col items-center justify-center gap-4">
                <p className="text-red-500">{error || "Submission not found."}</p>
                <button onClick={() => navigate("/admin")} className="text-sky-600 text-sm underline">
                    Back to dashboard
                </button>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-slate-50">
            {/* Header */}
            <header className="bg-white border-b border-slate-200 px-6 py-4 flex items-center gap-4">
                <button
                    onClick={() => navigate("/admin")}
                    className="p-2 rounded-lg border border-slate-200 hover:bg-slate-50 transition-colors"
                >
                    <ArrowLeft className="h-4 w-4 text-slate-500" />
                </button>
                <div className="flex-1">
                    <h1 className="font-bold text-slate-800">{submission.name}</h1>
                    <p className="text-xs text-slate-400 mt-0.5">
                        Submitted {format(new Date(submission.created_at), "dd MMM yyyy, hh:mm a")}
                    </p>
                </div>
                <span className={`px-3 py-1 rounded-full text-xs font-semibold border ${statusStyles[submission.status]}`}>
                    {statusOptions.find(s => s.value === submission.status)?.label}
                </span>
            </header>

            <main className="max-w-4xl mx-auto px-4 sm:px-6 py-8 space-y-6">

                {/* Contact Info */}
                <div className="bg-white rounded-2xl border border-slate-200 p-6 space-y-4">
                    <h2 className="font-semibold text-slate-700 text-sm uppercase tracking-wide">Contact Details</h2>
                    <div className="grid sm:grid-cols-2 gap-4">
                        <div className="flex items-start gap-3">
                            <div className="bg-sky-50 p-2 rounded-lg">
                                <Mail className="h-4 w-4 text-sky-600" />
                            </div>
                            <div>
                                <p className="text-xs text-slate-400">Email</p>
                                <a href={`mailto:${submission.email}`} className="text-sm text-slate-800 font-medium hover:text-sky-600">
                                    {submission.email}
                                </a>
                            </div>
                        </div>
                        <div className="flex items-start gap-3">
                            <div className="bg-sky-50 p-2 rounded-lg">
                                <Phone className="h-4 w-4 text-sky-600" />
                            </div>
                            <div>
                                <p className="text-xs text-slate-400">Phone</p>
                                <a href={`tel:${submission.phone}`} className="text-sm text-slate-800 font-medium hover:text-sky-600">
                                    {submission.phone}
                                </a>
                            </div>
                        </div>
                        {submission.service && (
                            <div className="flex items-start gap-3">
                                <div className="bg-sky-50 p-2 rounded-lg">
                                    <Briefcase className="h-4 w-4 text-sky-600" />
                                </div>
                                <div>
                                    <p className="text-xs text-slate-400">Service Requested</p>
                                    <p className="text-sm text-slate-800 font-medium">{submission.service}</p>
                                </div>
                            </div>
                        )}
                    </div>

                    {submission.message && (
                        <div className="flex items-start gap-3 pt-2 border-t border-slate-100">
                            <div className="bg-sky-50 p-2 rounded-lg shrink-0">
                                <MessageSquare className="h-4 w-4 text-sky-600" />
                            </div>
                            <div>
                                <p className="text-xs text-slate-400 mb-1">Message</p>
                                <p className="text-sm text-slate-700 leading-relaxed">{submission.message}</p>
                            </div>
                        </div>
                    )}
                </div>

                {/* Status Update */}
                <div className="bg-white rounded-2xl border border-slate-200 p-6">
                    <h2 className="font-semibold text-slate-700 text-sm uppercase tracking-wide mb-4">Update Status</h2>
                    <div className="flex flex-wrap gap-3">
                        {statusOptions.map((opt) => {
                            const Icon = opt.icon;
                            const isActive = submission.status === opt.value;
                            return (
                                <button
                                    key={opt.value}
                                    onClick={() => !isActive && handleStatusChange(opt.value)}
                                    disabled={updating || isActive}
                                    className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-semibold border transition-all duration-200
                    ${isActive
                                            ? `${statusStyles[opt.value]} cursor-default`
                                            : "bg-slate-50 border-slate-200 text-slate-600 hover:border-sky-300 hover:bg-sky-50 hover:text-sky-700"
                                        }`}
                                >
                                    <Icon className="h-4 w-4" />
                                    {opt.label}
                                    {isActive && <span className="text-xs opacity-70">(current)</span>}
                                </button>
                            );
                        })}
                    </div>
                    {submission.updated_at && (
                        <p className="text-xs text-slate-400 mt-3">
                            Last updated: {format(new Date(submission.updated_at), "dd MMM yyyy, hh:mm a")}
                        </p>
                    )}
                </div>

                {/* Email Logs */}
                {submission.email_logs?.length > 0 && (
                    <div className="bg-white rounded-2xl border border-slate-200 p-6">
                        <h2 className="font-semibold text-slate-700 text-sm uppercase tracking-wide mb-4">Email Logs</h2>
                        <div className="space-y-2">
                            {submission.email_logs.map((log: any, i: number) => (
                                <div key={i} className="flex items-center justify-between text-sm py-2 border-b border-slate-50 last:border-0">
                                    <div className="flex items-center gap-3">
                                        <span className="text-slate-500 capitalize">{log.type} notification</span>
                                        <span className="text-slate-400 text-xs">{log.recipient}</span>
                                    </div>
                                    <span className={`px-2 py-0.5 rounded-full text-xs font-semibold ${emailLogStyles[log.status] || "bg-slate-100 text-slate-600"}`}>
                                        {log.status}
                                    </span>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {/* Danger Zone */}
                <div className="bg-white rounded-2xl border border-red-100 p-6">
                    <h2 className="font-semibold text-red-600 text-sm uppercase tracking-wide mb-3">Danger Zone</h2>
                    {!confirmDelete ? (
                        <button
                            onClick={() => setConfirmDelete(true)}
                            className="flex items-center gap-2 px-4 py-2.5 rounded-xl border border-red-200 text-red-600 text-sm font-semibold hover:bg-red-50 transition-colors"
                        >
                            <Trash2 className="h-4 w-4" />
                            Delete Submission
                        </button>
                    ) : (
                        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3">
                            <p className="text-sm text-slate-600">Are you sure? This cannot be undone.</p>
                            <div className="flex gap-2">
                                <button
                                    onClick={handleDelete}
                                    disabled={deleting}
                                    className="px-4 py-2 rounded-lg bg-red-500 text-white text-sm font-semibold hover:bg-red-600 disabled:opacity-60 transition-colors"
                                >
                                    {deleting ? "Deleting..." : "Yes, Delete"}
                                </button>
                                <button
                                    onClick={() => setConfirmDelete(false)}
                                    className="px-4 py-2 rounded-lg border border-slate-200 text-slate-600 text-sm font-semibold hover:bg-slate-50 transition-colors"
                                >
                                    Cancel
                                </button>
                            </div>
                        </div>
                    )}
                </div>

            </main>
        </div>
    );
};

export default SubmissionDetail;
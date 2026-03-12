import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Search, ChevronLeft, ChevronRight, Inbox } from "lucide-react";
import { format } from "date-fns";

interface Submission {
    id: string;
    name: string;
    email: string;
    phone: string;
    service: string;
    message: string;
    status: "unread" | "in_progress" | "resolved";
    created_at: string;
}

interface Pagination {
    total: number;
    page: number;
    limit: number;
    totalPages: number;
}

interface SubmissionsTableProps {
    submissions: Submission[];
    pagination: Pagination | null;
    loading: boolean;
    search: string;
    status: string;
    onSearchChange: (val: string) => void;
    onStatusChange: (val: string) => void;
    onPageChange: (page: number) => void;
}

const statusStyles: Record<string, string> = {
    unread: "bg-sky-100 text-sky-700",
    in_progress: "bg-amber-100 text-amber-700",
    resolved: "bg-green-100 text-green-700",
};

const statusLabels: Record<string, string> = {
    unread: "Unread",
    in_progress: "In Progress",
    resolved: "Resolved",
};

const SubmissionsTable = ({
    submissions,
    pagination,
    loading,
    search,
    status,
    onSearchChange,
    onStatusChange,
    onPageChange,
}: SubmissionsTableProps) => {
    const navigate = useNavigate();
    const [searchInput, setSearchInput] = useState(search);

    const handleSearchSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onSearchChange(searchInput);
    };

    return (
        <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden">
            {/* Toolbar */}
            <div className="p-4 border-b border-slate-100 flex flex-col sm:flex-row gap-3">
                <form onSubmit={handleSearchSubmit} className="flex-1 relative">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                    <input
                        type="text"
                        placeholder="Search by name, email or phone..."
                        value={searchInput}
                        onChange={(e) => setSearchInput(e.target.value)}
                        className="w-full pl-9 pr-4 py-2 text-sm border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-400 focus:border-transparent"
                    />
                </form>
                <select
                    value={status}
                    onChange={(e) => onStatusChange(e.target.value)}
                    className="text-sm border border-slate-200 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-sky-400 bg-white"
                >
                    <option value="all">All Statuses</option>
                    <option value="unread">Unread</option>
                    <option value="in_progress">In Progress</option>
                    <option value="resolved">Resolved</option>
                </select>
            </div>

            {/* Table */}
            <div className="overflow-x-auto">
                <table className="w-full text-sm">
                    <thead>
                        <tr className="bg-slate-50 border-b border-slate-100 text-left">
                            <th className="px-4 py-3 font-semibold text-slate-500">Name</th>
                            <th className="px-4 py-3 font-semibold text-slate-500 hidden md:table-cell">Email</th>
                            <th className="px-4 py-3 font-semibold text-slate-500 hidden lg:table-cell">Phone</th>
                            <th className="px-4 py-3 font-semibold text-slate-500 hidden lg:table-cell">Service</th>
                            <th className="px-4 py-3 font-semibold text-slate-500">Status</th>
                            <th className="px-4 py-3 font-semibold text-slate-500 hidden sm:table-cell">Date</th>
                        </tr>
                    </thead>
                    <tbody>
                        {loading ? (
                            Array.from({ length: 6 }).map((_, i) => (
                                <tr key={i} className="border-b border-slate-50">
                                    {Array.from({ length: 6 }).map((_, j) => (
                                        <td key={j} className="px-4 py-3">
                                            <div className="h-4 bg-slate-100 animate-pulse rounded" />
                                        </td>
                                    ))}
                                </tr>
                            ))
                        ) : submissions.length === 0 ? (
                            <tr>
                                <td colSpan={6} className="px-4 py-16 text-center">
                                    <div className="flex flex-col items-center gap-2 text-slate-400">
                                        <Inbox className="h-8 w-8" />
                                        <p className="font-medium">No submissions found</p>
                                    </div>
                                </td>
                            </tr>
                        ) : (
                            submissions.map((sub) => (
                                <tr
                                    key={sub.id}
                                    onClick={() => navigate(`/admin/submissions/${sub.id}`)}
                                    className="border-b border-slate-50 hover:bg-sky-50 cursor-pointer transition-colors duration-150"
                                >
                                    <td className="px-4 py-3 font-medium text-slate-800">{sub.name}</td>
                                    <td className="px-4 py-3 text-slate-500 hidden md:table-cell">{sub.email}</td>
                                    <td className="px-4 py-3 text-slate-500 hidden lg:table-cell">{sub.phone}</td>
                                    <td className="px-4 py-3 text-slate-500 hidden lg:table-cell truncate max-w-[160px]">{sub.service || "—"}</td>
                                    <td className="px-4 py-3">
                                        <span className={`px-2 py-1 rounded-full text-xs font-semibold ${statusStyles[sub.status]}`}>
                                            {statusLabels[sub.status]}
                                        </span>
                                    </td>
                                    <td className="px-4 py-3 text-slate-400 hidden sm:table-cell text-xs">
                                        {format(new Date(sub.created_at), "dd MMM yyyy")}
                                    </td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>

            {/* Pagination */}
            {pagination && pagination.totalPages > 1 && (
                <div className="px-4 py-3 border-t border-slate-100 flex items-center justify-between">
                    <p className="text-sm text-slate-400">
                        {pagination.total} total · Page {pagination.page} of {pagination.totalPages}
                    </p>
                    <div className="flex gap-2">
                        <button
                            onClick={() => onPageChange(pagination.page - 1)}
                            disabled={pagination.page <= 1}
                            className="p-1.5 rounded-lg border border-slate-200 disabled:opacity-40 hover:bg-slate-50 transition-colors"
                        >
                            <ChevronLeft className="h-4 w-4" />
                        </button>
                        <button
                            onClick={() => onPageChange(pagination.page + 1)}
                            disabled={pagination.page >= pagination.totalPages}
                            className="p-1.5 rounded-lg border border-slate-200 disabled:opacity-40 hover:bg-slate-50 transition-colors"
                        >
                            <ChevronRight className="h-4 w-4" />
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default SubmissionsTable;
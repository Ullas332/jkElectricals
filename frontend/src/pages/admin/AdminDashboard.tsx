import { useState, useEffect, useCallback } from "react";
import { useAuth, UserButton } from "@clerk/clerk-react";
import { RefreshCw } from "lucide-react";
import StatsCards from "@/components/admin/StatsCards";
import SubmissionsTable from "@/components/admin/SubmissionsTable";
import { fetchStats, fetchSubmissions } from "@/lib/adminApi";

const AdminDashboard = () => {
    const { getToken } = useAuth();

    const [stats, setStats] = useState(null);
    const [submissions, setSubmissions] = useState([]);
    const [pagination, setPagination] = useState(null);
    const [statsLoading, setStatsLoading] = useState(true);
    const [tableLoading, setTableLoading] = useState(true);

    // Filter state
    const [search, setSearch] = useState("");
    const [status, setStatus] = useState("all");
    const [page, setPage] = useState(1);

    const loadStats = useCallback(async () => {
        try {
            setStatsLoading(true);
            const token = await getToken();
            const res = await fetchStats(token!);
            setStats(res.stats);
        } catch (err) {
            console.error("Stats error:", err);
        } finally {
            setStatsLoading(false);
        }
    }, [getToken]);

    const loadSubmissions = useCallback(async () => {
        try {
            setTableLoading(true);
            const token = await getToken();
            const res = await fetchSubmissions(token!, { page, status, search, limit: 20 });
            setSubmissions(res.data);
            setPagination(res.pagination);
        } catch (err) {
            console.error("Submissions error:", err);
        } finally {
            setTableLoading(false);
        }
    }, [getToken, page, status, search]);

    useEffect(() => { loadStats(); }, [loadStats]);
    useEffect(() => { loadSubmissions(); }, [loadSubmissions]);

    // Reset to page 1 when filter/search changes
    const handleSearchChange = (val: string) => { setSearch(val); setPage(1); };
    const handleStatusChange = (val: string) => { setStatus(val); setPage(1); };

    const handleRefresh = () => { loadStats(); loadSubmissions(); };

    return (
        <div className="min-h-screen bg-slate-50">
            {/* Header */}
            <header className="bg-white border-b border-slate-200 px-6 py-4 flex items-center justify-between">
                <div className="flex items-center gap-3">
                    <img src="/logo.png" alt="JK Electricals" className="w-10 h-10 rounded-xl object-contain bg-white border border-sky-100 p-0.5" />
                    <div>
                        <h1 className="font-bold text-slate-800 leading-none">JK Electricals</h1>
                        <p className="text-xs text-slate-400 mt-0.5">Admin Dashboard</p>
                    </div>
                </div>
                <div className="flex items-center gap-3">
                    <button
                        onClick={handleRefresh}
                        className="p-2 rounded-lg border border-slate-200 hover:bg-slate-50 transition-colors"
                        title="Refresh"
                    >
                        <RefreshCw className="h-4 w-4 text-slate-500" />
                    </button>
                    <UserButton afterSignOutUrl="/admin/login" />
                </div>
            </header>

            {/* Main */}
            <main className="max-w-7xl mx-auto px-4 sm:px-6 py-8 space-y-6">
                <div>
                    <h2 className="text-lg font-bold text-slate-800">Overview</h2>
                    <p className="text-sm text-slate-500 mt-0.5">All contact form submissions</p>
                </div>

                <StatsCards stats={stats} loading={statsLoading} />

                <div>
                    <h2 className="text-lg font-bold text-slate-800 mb-3">Submissions</h2>
                    <SubmissionsTable
                        submissions={submissions}
                        pagination={pagination}
                        loading={tableLoading}
                        search={search}
                        status={status}
                        onSearchChange={handleSearchChange}
                        onStatusChange={handleStatusChange}
                        onPageChange={setPage}
                    />
                </div>
            </main>
        </div>
    );
};

export default AdminDashboard;
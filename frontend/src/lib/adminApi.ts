const API_URL = import.meta.env.VITE_API_URL;

if (!API_URL) {
  throw new Error("VITE_API_URL is not defined");
}

// All admin API calls go through this — attaches Clerk JWT automatically
const adminFetch = async (path: string, token: string, options: RequestInit = {}) => {
    const res = await fetch(`${API_URL}${path}`, {
        ...options,
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
            ...options.headers,
        },
    });

    const data = await res.json();
    if (!res.ok) throw new Error(data.error || "Request failed");
    return data;
};

// ── Stats ──────────────────────────────────────────────────────────────────
export const fetchStats = (token: string) =>
    adminFetch("/api/admin/stats", token);

// ── Submissions ────────────────────────────────────────────────────────────
export interface SubmissionsParams {
    page?: number;
    limit?: number;
    status?: string;
    search?: string;
}

export const fetchSubmissions = (token: string, params: SubmissionsParams = {}) => {
    const query = new URLSearchParams();
    if (params.page) query.set("page", String(params.page));
    if (params.limit) query.set("limit", String(params.limit));
    if (params.status && params.status !== "all") query.set("status", params.status);
    if (params.search) query.set("search", params.search);
    return adminFetch(`/api/admin/submissions?${query.toString()}`, token);
};

export const fetchSubmission = (token: string, id: string) =>
    adminFetch(`/api/admin/submissions/${id}`, token);

export const updateStatus = (token: string, id: string, status: string) =>
    adminFetch(`/api/admin/submissions/${id}/status`, token, {
        method: "PATCH",
        body: JSON.stringify({ status }),
    });

export const deleteSubmission = (token: string, id: string) =>
    adminFetch(`/api/admin/submissions/${id}`, token, { method: "DELETE" });
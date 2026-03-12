import express from "express";
import { z } from "zod";
import supabase from "../services/supabase.js";
import { requireAdmin } from "../middleware/reqAdmin.js";

const router = express.Router();

// All routes below require a valid Clerk session
router.use(requireAdmin);

// ── UUID validation schema ─────────────────────────────────────────────────
const uuidSchema = z.string().uuid("Invalid submission ID.");

const validateId = (id, res) => {
    const result = uuidSchema.safeParse(id);
    if (!result.success) {
        res.status(400).json({ success: false, error: "Invalid submission ID." });
        return false;
    }
    return true;
};

// ── GET /api/admin/stats ───────────────────────────────────────────────────
router.get("/stats", async (req, res) => {
    try {
        const [total, unread, resolved] = await Promise.all([
            supabase.from("contact_submissions").select("*", { count: "exact", head: true }),
            supabase.from("contact_submissions").select("*", { count: "exact", head: true }).eq("status", "unread"),
            supabase.from("contact_submissions").select("*", { count: "exact", head: true }).eq("status", "resolved"),
        ]);

        if (total.error) {
            console.error("Stats fetch error:", total.error);
            return res.status(500).json({ success: false, error: "Failed to fetch stats." });
        }

        return res.json({
            success: true,
            stats: {
                total: total.count ?? 0,
                unread: unread.count ?? 0,
                resolved: resolved.count ?? 0,
                inProgress: (total.count ?? 0) - (unread.count ?? 0) - (resolved.count ?? 0),
            },
        });
    } catch (err) {
        console.error("Stats route error:", err);
        return res.status(500).json({ success: false, error: "Server error." });
    }
});

// ── GET /api/admin/submissions ─────────────────────────────────────────────
// Supports pagination, status filter, and search.
// Query params: page, limit, status, search
router.get("/submissions", async (req, res) => {
    try {
        // Prevent page < 1 and limit > 100
        const page = Math.max(parseInt(req.query.page) || 1, 1);
        const limit = Math.min(parseInt(req.query.limit) || 20, 100);
        const status = req.query.status || null;
        const search = req.query.search || null;

        const from = (page - 1) * limit;
        const to = from + limit - 1;

        // Sanitize search — strip % and _ to prevent malformed Supabase ilike queries
        const safeSearch = search?.replace(/[%_]/g, "");

        let query = supabase
            .from("contact_submissions")
            .select("*", { count: "exact" })
            .order("created_at", { ascending: false })
            .range(from, to);

        if (status) query = query.eq("status", status);
        if (safeSearch) query = query.or(`name.ilike.%${safeSearch}%,email.ilike.%${safeSearch}%,phone.ilike.%${safeSearch}%`);

        const { data, count, error } = await query;

        if (error) {
            console.error("Submissions fetch error:", error);
            return res.status(500).json({ success: false, error: "Failed to fetch submissions." });
        }

        return res.json({
            success: true,
            data,
            pagination: {
                total: count,
                page,
                limit,
                totalPages: Math.ceil((count ?? 0) / limit),
            },
        });
    } catch (err) {
        console.error("Submissions route error:", err);
        return res.status(500).json({ success: false, error: "Server error." });
    }
});

// ── GET /api/admin/submissions/:id ────────────────────────────────────────
// Single submission with its email logs.
router.get("/submissions/:id", async (req, res) => {
    try {
        if (!validateId(req.params.id, res)) return;
        const { id } = req.params;

        const { data: submission, error: subError } = await supabase
            .from("contact_submissions")
            .select("*")
            .eq("id", id)
            .single();

        if (subError || !submission) {
            return res.status(404).json({ success: false, error: "Submission not found." });
        }

        const { data: logs, error: logError } = await supabase
            .from("email_logs")
            .select("*")
            .eq("submission_id", id)
            .order("created_at", { ascending: true });

        if (logError) {
            console.error("Email log fetch error:", logError);
        }

        return res.json({
            success: true,
            data: {
                ...submission,
                email_logs: logs || [],
            },
        });
    } catch (err) {
        console.error("Submission detail route error:", err);
        return res.status(500).json({ success: false, error: "Server error." });
    }
});

// ── PATCH /api/admin/submissions/:id/status ───────────────────────────────
// Update status: "unread" | "in_progress" | "resolved"
router.patch("/submissions/:id/status", async (req, res) => {
    try {
        if (!validateId(req.params.id, res)) return;
        const { id } = req.params;
        const { status } = req.body;

        const validStatuses = ["unread", "in_progress", "resolved"];
        if (!validStatuses.includes(status)) {
            return res.status(400).json({
                success: false,
                error: `Status must be one of: ${validStatuses.join(", ")}`,
            });
        }

        const { data, error } = await supabase
            .from("contact_submissions")
            .update({ status, updated_at: new Date().toISOString() })
            .eq("id", id)
            .select()
            .single();

        if (error || !data) {
            console.error("Status update error:", error);
            return res.status(500).json({ success: false, error: "Failed to update status." });
        }

        return res.json({ success: true, data });
    } catch (err) {
        console.error("Status route error:", err);
        return res.status(500).json({ success: false, error: "Server error." });
    }
});

// ── DELETE /api/admin/submissions/:id ─────────────────────────────────────
// Delete a submission and its associated email logs.
router.delete("/submissions/:id", async (req, res) => {
    try {
        if (!validateId(req.params.id, res)) return;
        const { id } = req.params;

        // Delete email logs first (foreign key constraint)
        const { error: logDeleteError } = await supabase
            .from("email_logs")
            .delete()
            .eq("submission_id", id);

        if (logDeleteError) {
            console.error("Email log delete error:", logDeleteError);
        }

        const { error } = await supabase
            .from("contact_submissions")
            .delete()
            .eq("id", id);

        if (error) {
            console.error("Submission delete error:", error);
            return res.status(500).json({ success: false, error: "Failed to delete submission." });
        }

        return res.json({ success: true, message: "Submission deleted." });
    } catch (err) {
        console.error("Delete route error:", err);
        return res.status(500).json({ success: false, error: "Server error." });
    }
});

export default router;
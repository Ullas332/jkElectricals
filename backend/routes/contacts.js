import express from "express";
import { z } from "zod";
import sanitizeHtml from "sanitize-html";
import { sendContactEmail } from "../services/mailer.js";
import supabase from "../services/supabase.js";

const router = express.Router();

// ── Validation schema ──────────────────────────────────────────────────────
const contactSchema = z.object({
    name: z.string().min(2, "Name must be at least 2 characters").max(100),
    email: z.string().email("Invalid email address"),
    phone: z.string().min(10, "Phone must be at least 10 digits").max(20),
    service: z.string().max(100).optional(),
    message: z.string().max(1000, "Message cannot exceed 1000 characters").optional(),
});

router.post("/", async (req, res) => {
    try {

        // ── 1. Validate input ────────────────────────────────────────────────────
        const result = contactSchema.safeParse(req.body);

        if (!result.success) {
            const firstError = result.error.errors[0];
            return res.status(400).json({
                success: false,
                error: firstError?.message || "Invalid input. Please check your details.",
            });
        }

        const { name, email, phone, service, message } = result.data;

        // ── 2. Sanitize message field ────────────────────────────────────────────
        // Strips all HTML tags from the message to prevent XSS if content
        // is ever rendered in an email client or admin dashboard.
        const sanitizedMessage = message
            ? sanitizeHtml(message, { allowedTags: [], allowedAttributes: {} })
            : undefined;

        // ── 3. Duplicate submission protection ───────────────────────────────────
        // Reject if the same email has submitted a form within the last 5 minutes.
        const fiveMinutesAgo = new Date(Date.now() - 5 * 60 * 1000).toISOString();

        const { data: recentSubmission } = await supabase
            .from("contact_submissions")
            .select("id")
            .eq("email", email)
            .gte("created_at", fiveMinutesAgo)
            .limit(1)
            .single();

        if (recentSubmission) {
            return res.status(429).json({
                success: false,
                error: "Please wait before submitting again.",
            });
        }

        // ── 4. Save submission to Supabase ───────────────────────────────────────
        const { data: submission, error: dbError } = await supabase
            .from("contact_submissions")
            .insert({ name, email, phone, service, message: sanitizedMessage })
            .select()
            .single();

        if (dbError) {
            console.error("Supabase insert error:", dbError);
            return res.status(500).json({
                success: false,
                error: "Failed to save your request. Please try again.",
            });
        }

        // ── 5. Send emails + log results ─────────────────────────────────────────
        const emailResults = await sendContactEmail({
            name,
            email,
            phone,
            service,
            message: sanitizedMessage,
        });

        const logs = emailResults.map((result) => ({
            submission_id: submission.id,
            recipient: result.recipient,
            type: result.type,
            status: result.status,
            error: result.error || null,
        }));

        const { error: logError } = await supabase.from("email_logs").insert(logs);

        if (logError) {
            console.error("Supabase email log error:", logError);
        }

        // ── 6. Check if owner email succeeded ────────────────────────────────────
        const ownerResult = emailResults.find((r) => r.type === "owner");
        if (ownerResult?.status === "failed") {
            return res.status(500).json({
                success: false,
                error: "Failed to send message. Please try again or call us directly.",
            });
        }

        return res.status(200).json({
            success: true,
            message: "Your request has been received. We'll contact you within 24 hours.",
        });

    } catch (err) {
        // ── 7. Catch unexpected errors ────────────────────────────────────────────
        console.error("Contact route error:", err);
        return res.status(500).json({
            success: false,
            error: "Server error. Please try again later.",
        });
    }
});

export default router;
import axios from "axios";

/**
 * reCAPTCHA v3 verification middleware with tiered scoring.
 *
 * Score tiers:
 *   >= 0.7   → legitimate, proceed normally
 *   0.4–0.69 → suspicious, proceed but flag for review
 *   < 0.4    → likely bot, reject
 *
 * Attaches to req:
 *   req.recaptchaScore       – the raw score (0.0 – 1.0)
 *   req.isSuspicious         – true when 0.4 <= score < 0.7
 */
const verifyCaptcha = async (req, res, next) => {
    const token = req.body?.recaptchaToken;

    // ── Missing token ──────────────────────────────────────────────────────────
    if (!token) {
        return res.status(400).json({
            success: false,
            error: "reCAPTCHA token is missing. Please refresh the page and try again.",
        });
    }

    try {
        // ── Verify with Google ─────────────────────────────────────────────────
        const { data } = await axios.post(
            "https://www.google.com/recaptcha/api/siteverify",
            null,
            {
                params: {
                    secret: process.env.RECAPTCHA_SECRET_KEY,
                    response: token,
                },
                timeout: 5000, // 5 s max
            },
        );

        if (!data.success) {
            console.warn("reCAPTCHA verification failed:", data["error-codes"]);
            return res.status(403).json({
                success: false,
                error: "reCAPTCHA verification failed. Please try again.",
            });
        }

        const score = data.score;
        console.log("reCAPTCHA score:", score);

        // ── Tiered scoring ─────────────────────────────────────────────────────
        if (score < 0.4) {
            console.warn(`reCAPTCHA BLOCKED — score ${score} (likely bot)`);
            return res.status(400).json({
                success: false,
                error: "Our spam detection flagged this request. If you're a real user, please try again later.",
            });
        }

        // Attach score metadata to the request for downstream handlers
        req.recaptchaScore = score;
        req.isSuspicious = score < 0.7; // true when 0.4 <= score < 0.7

        if (req.isSuspicious) {
            console.warn(`reCAPTCHA SUSPICIOUS — score ${score}`);
        }

        next();
    } catch (err) {
        console.error("reCAPTCHA verification error:", err.message);
        return res.status(500).json({
            success: false,
            error: "Could not verify reCAPTCHA. Please try again.",
        });
    }
};

export default verifyCaptcha;

import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import helmet from "helmet";
import morgan from "morgan";
import rateLimit, { ipKeyGenerator } from "express-rate-limit";
import timeout from "connect-timeout";
import { clerkMiddleware } from "@clerk/express";
import contactRoute from "./routes/contacts.js";
import adminRoute from "./routes/admin.js";
import verifyCaptcha from "./middleware/verifyCaptcha.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// ── 1. Hide Express fingerprint ────────────────────────────────────────────
app.disable("x-powered-by");

// ── 2. Trust Cloudflare proxy ──────────────────────────────────────────────
app.set("trust proxy", 1);

// ── 3. Timeout protection ──────────────────────────────────────────────────
// Kills any request that takes longer than 10 seconds to complete.
// Prevents slow clients or hanging DB queries from holding up server resources.
app.use(timeout("10s"));

// Halt middleware chain if request has already timed out.
// Place this after any async middleware to abort early.
const haltOnTimeout = (req, res, next) => {
    if (!req.timedout) next();
};

// ── 4. Security headers ────────────────────────────────────────────────────
app.use(helmet({
    contentSecurityPolicy: {
        directives: {
            ...helmet.contentSecurityPolicy.getDefaultDirectives(),
            "upgrade-insecure-requests": null, // Stops browser from forcing HTTPS
        },
    },
}));

// ── 5. Request logging ─────────────────────────────────────────────────────
app.use(morgan("combined"));

// ── 6. CORS ────────────────────────────────────────────────────────────────
app.use(cors({
    origin: process.env.FRONTEND_URL || "http://localhost:8081",
    methods: ["GET", "POST", "PATCH", "DELETE"],
    credentials: true,
}));

// ── 7. Body size limit ─────────────────────────────────────────────────────
app.use(express.json({ limit: "10kb" }));
app.use(haltOnTimeout);

// ── 8. Clerk middleware ────────────────────────────────────────────────────
app.use(clerkMiddleware());
app.use(haltOnTimeout);

// ── 9. Rate limiting — contact form only ──────────────────────────────────
const contactLimiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 5,
    standardHeaders: true,
    legacyHeaders: false,
    keyGenerator: ipKeyGenerator,
    message: {
        success: false,
        error: "Too many requests. Please wait 15 minutes before trying again.",
    },
});

// ── 10. Routes ─────────────────────────────────────────────────────────────
app.use("/api/contact", verifyCaptcha, contactLimiter, haltOnTimeout, contactRoute);
app.use("/api/admin", haltOnTimeout, adminRoute);

app.get("/api/health", (req, res) => res.json({ status: "ok" }));

// ── 11. Global error handler ───────────────────────────────────────────────
app.use((err, req, res, next) => {
    if (req.timedout) {
        return res.status(503).json({ success: false, error: "Request timed out. Please try again." });
    }
    console.error("[Error]", err.stack || err.message || err);
    res.status(500).json({ success: false, error: "Internal server error" });
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
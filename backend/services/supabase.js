import dotenv from "dotenv";
dotenv.config();
import { createClient } from "@supabase/supabase-js";

// ── Environment variable validation ───────────────────────────────────────
// Crash immediately at startup if required variables are missing.
// This prevents silent failures where the server starts but all DB
// calls fail at runtime with a confusing error.
const requiredEnvVars = [
    "SUPABASE_URL",
    "SUPABASE_SERVICE_ROLE_KEY",
    "CLERK_SECRET_KEY",
    "CLERK_PUBLISHABLE_KEY",
    "RESEND_API_KEY",
    "OWNER_EMAIL",
    "FRONTEND_URL",
];

const missingVars = requiredEnvVars.filter((key) => !process.env[key]);

if (missingVars.length > 0) {
    console.error("❌ Missing required environment variables:");
    missingVars.forEach((key) => console.error(`   - ${key}`));
    console.error("Fix your .env file and restart the server.");
    process.exit(1);
}

// ── Supabase client ───────────────────────────────────────────────────────
const supabase = createClient(
    process.env.SUPABASE_URL,
    process.env.SUPABASE_SERVICE_ROLE_KEY  // service role key — never expose this on frontend
);

export default supabase;
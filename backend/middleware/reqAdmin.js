import { clerkMiddleware, getAuth } from "@clerk/express";

// Step 1: Run Clerk's middleware to parse the JWT from Authorization header
export const clerkAuth = clerkMiddleware();

// Step 2: Verify the request has a valid, signed-in session
export const requireAdmin = (req, res, next) => {
    const { userId } = getAuth(req);

    if (!userId) {
        return res.status(401).json({ success: false, error: "Unauthorized. Please sign in." });
    }

    next();
};
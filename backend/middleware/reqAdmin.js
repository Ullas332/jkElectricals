import { getAuth } from "@clerk/express";

// Verify the request has a valid, signed-in session
export const requireAdmin = (req, res, next) => {
    const { userId } = getAuth(req);

    if (!userId) {
        return res.status(401).json({ success: false, error: "Unauthorized. Please sign in." });
    }

    next();
};
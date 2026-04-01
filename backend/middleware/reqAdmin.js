import { getAuth, clerkClient } from "@clerk/express";

// Verify the request has a valid, signed-in session and matches allowed admin emails
export const requireAdmin = async (req, res, next) => {
    try {
        const { userId } = getAuth(req);

        if (!userId) {
            return res.status(401).json({ success: false, error: "Unauthorized. Please sign in." });
        }

        // Fetch user details from Clerk to check email
        const user = await clerkClient.users.getUser(userId);
        
        const primaryEmailObj = user.emailAddresses.find(
            (email) => email.id === user.primaryEmailAddressId
        );
        const userEmail = primaryEmailObj?.emailAddress?.trim().toLowerCase();

        const allowedEmails = (process.env.ADMIN_EMAILS || "")
            .split(",")
            .map(e => e.trim().toLowerCase());

        if (!userEmail || !allowedEmails.includes(userEmail)) {
            return res.status(403).json({ success: false, error: "Forbidden. Admin access required." });
        }

        next();
    } catch (error) {
        console.error("Admin authorization error:", error);
        return res.status(500).json({ success: false, error: "Server error during authorization." });
    }
};
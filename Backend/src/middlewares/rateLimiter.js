import { rateLimit } from "express-rate-limit";

// General API rate limiter
export const apiLimiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes

    limit: 100, // Maximum 100 requests

    standardHeaders: "draft-8",

    legacyHeaders: false,

    message: {
        success: false,
        message: "Too many requests. Please try again later."
    }
});
import { rateLimit } from "express-rate-limit";

export const authLimiter = rateLimit({
    windowMs: 15 * 60 * 1000,

    limit: 2,

    standardHeaders: "draft-8",

    legacyHeaders: false,

    message: {
        success: false,
        message: "Too many login attempts. Try again later."
    }
});
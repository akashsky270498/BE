import rateLimit from "express-rate-limit";
import { HTTP_STATUS_CODES, RATE_LIMIT_CONSTANTS } from "../utils/constants";
const createRateLimiter = (options: {
    windowMs: number,
    max: number,
    message?: string,
}) => {
    return rateLimit({
        windowMs: options.windowMs,
        max: options.max,
        message: options.message || "Too many request(s), Please try again later.",
        standardHeaders: true, //Returns rate limit info in the `RateLimit-*` headers
        legacyHeaders: false, //Disable the `X-RateLimit-*` headers
        handler: (req, res) => {
            res.status(HTTP_STATUS_CODES.RATE_LIMIT).json({
                statusCode: HTTP_STATUS_CODES.RATE_LIMIT,
                success: false,
                message: options.message || "Too many request(s), Please try again later.",
                errors: [],
                data: null,
            });
        },
    });
}

// General API rate limiter: 100 requests per 15 minutes
export const apiLimiter = createRateLimiter({
    windowMs: RATE_LIMIT_CONSTANTS.FIFTEEN_MIN,
    max: RATE_LIMIT_CONSTANTS.MAX_REQUESTS,
});

// Auth route limiter: 5 requests per hour
export const authLimiter = createRateLimiter({
    windowMs: RATE_LIMIT_CONSTANTS.ONE_HOUR,
    max: RATE_LIMIT_CONSTANTS.MAX_AUTH_REQUESTS,
    message: "Too many login attempts. Please try again after an hour."
});


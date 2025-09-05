import { Request, Response, NextFunction } from "express";
import { logger } from "../utils/logger";
import timeout from "connect-timeout";
import { HTTP_STATUS_CODES } from "../utils/constants";
import RESPONSE from "../utils/response";


//Timeout duration for different type of operations
const timeoutConfig = {
    QUICK: '5s',
    STANDARD: '10s',
    EXTENDED: '30s',
} as const;

/**
 * Middleware factory to apply request timeouts
 * @param duration Timeout duration string (e.g., '15s')
 * @returns Middleware array including timeout and handler
 */

export const setRequestTimeout = (duration: string = timeoutConfig.STANDARD) => [
    timeout(duration, { respond: false }), // prevent auto response to allow custom handling
    handleTimeout
];

//Handles timeout requests gracefully
function handleTimeout(req: Request, res: Response, next: NextFunction) {
    if (!req.timedout) return next();

    if (!res.headersSent) {
        //Explicitily clear timeout to prevent leaks
        res.setTimeout(0);

        logger.warn('Request timed out', {
            method: req.method,
            url: req.originalUrl || req.url,
            headers: req.headers,
        });

        return RESPONSE.FailureResponse(res, HTTP_STATUS_CODES.TIMEOUT, {
            message: 'Request Timeout',
            errors: [
                {
                    code: 'REQUEST_TIMEOUT',
                    detail: 'The server timed out waiting for the request to complete.'
                }
            ]
        });
    }
}


//predefined timeout durations
export const quickTimeout = setRequestTimeout(timeoutConfig.QUICK);
export const stdTimeout = setRequestTimeout(timeoutConfig.STANDARD);
export const extendedTimeout = setRequestTimeout(timeoutConfig.EXTENDED);
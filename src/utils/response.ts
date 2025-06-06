import { Response } from "express";


interface Metadata {
    page?: number;
    limit?: number;
    total: number;
    totalPages?: number;
}

interface SuccessResponseParams {
    message: string;
    data?: any[];
    meta?: Metadata;
}

interface FailureResponseParams {
    message: string;
    errors?: any[];
    meta?: Metadata
}

const RESPONSE = {
    SuccessResponse: (res: Response, status = 200, payload: SuccessResponseParams) => {
        return res.status(status).json({
            success: true,
            statusCode: status,
            message: payload.message,
            data: Array.isArray(payload.data) ? payload.data : [],
            meta: payload.meta ?? undefined
        })
    },

    FailureResponse: (res: Response, status = 500, payload: FailureResponseParams) => {
        return res.status(status).json({
            success: false,
            statusCode: status,
            message: payload.message,
            data: [],
            errors: payload.errors ?? [],
            meta: payload.meta ?? undefined
        })
    }
}

export default RESPONSE;
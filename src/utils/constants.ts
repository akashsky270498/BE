import { RateLimitConstants } from "./interfaces/rateLimitInterface";

export const HTTP_STATUS_CODES = {
    BAD_REQUEST: 400,
    TIMEOUT: 408,
    RATE_LIMIT: 429,
    INTERNAL_SERVER_ERROR: 500,
    UNEXPECTED_ERROR: 500,
    SUCCESS: 200,
    CREATED: 201,
    CONFLICT: 409,
    UNAUTHORIZED: 401,
    FORBIDDEN: 403,
    NOT_FOUND: 404,
    VALIDATION_ERROR: 422,
}

export const CORS_OPTIONS = {
    MAX_AGE_IN_MS: 86400
}

export const RATE_LIMIT_CONSTANTS: RateLimitConstants = {
    FIFTEEN_MIN: 15 * 60 * 1000,
    ONE_HOUR: 60 * 60 * 1000,
    MAX_REQUESTS: 100,
    MAX_AUTH_REQUESTS: 5,
};

export const WINSTON_LOG_LEVELS = {
    ZERO: 0,
    ONE: 1,
    TWO: 2,
    THREE: 3,
    FOUR: 4,
}

export const DOT_ENV = {
    DEFAULT_PORT: 3000
}

export const POST_MODEL_CONSTANTS = {
    MAX_COMMENT_LENGTH: 1000,
    MAX_CAPTION_LENGTH: 2200
}

export const MULTER_CONSTANTS = {
    MAX_FILE_SIZE: 10 * 1024 * 1024,// 10MB per file
    MAX_FILE_COUNT: 5,
}

export const MSG_LENGTH = {
    MAX_PREVIEW: 50,
    MIN: 0,
    MAX: 5000
}

export const DEFAULT_VALUES = {
    ZERO: 0,
    MIN: 0,
    FIVE: 5,
    TWENTY: 20,
    TEN: 10,
    THREE:3,
    EIGHT: 8,
}

export const MONGO_INDEX_DIRECTIONS = {
    ASC: 1,
    DESC: -1,
  } as const;
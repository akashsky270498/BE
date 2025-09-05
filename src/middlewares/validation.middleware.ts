import { Request, Response, NextFunction } from 'express';
import { Schema } from 'joi';
import RESPONSE from '../utils/response';
import {HTTP_STATUS_CODES} from "../utils/constants";
//Generic Validation Middleware

export const validate = (schema: Schema) => {
  return (req: Request, res: Response, next: NextFunction) => {
    const { error } = schema.validate(req.body, { abortEarly: false });

    if (error) {
      const errors = error.details.map((detail) => detail.message);
      return RESPONSE.FailureResponse(res, HTTP_STATUS_CODES.VALIDATION_ERROR, {
        message: 'Validation error',
        errors,
      });
    }
    next();
  };
};

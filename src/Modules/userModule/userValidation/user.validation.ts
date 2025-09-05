import Joi from 'joi';

export const registerUserValidation = Joi.object({
  fullName: Joi.string()
    .pattern(/^[A-Za-z ]+$/)
    .min(3)
    .max(50)
    .required()
    .messages({
      "string.empty": "Full name is required",
      "string.min": "Full name must be at least 3 characters",
      "string.max": "Full name cannot exceed 50 characters",
      "string.pattern.base": "Full name can only contain letters and spaces",
    }),

  email: Joi.string()
    .email({ tlds: { allow: false } })
    .required()
    .messages({
      "string.empty": "Email is required",
      "string.email": "Please enter a valid email address",
    }),

  username: Joi.string()
    .alphanum()
    .min(3)
    .max(20)
    .required()
    .messages({
      "string.empty": "Username is required",
      "string.min": "Username must be at least 3 characters",
      "string.max": "Username cannot exceed 20 characters",
      "string.alphanum": "Username can only contain letters and numbers",
    }),

  password: Joi.string()
    .min(8)
    .max(30)
    .pattern(new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[!@#$%^&*()_+\\-=\\[\\]{};':\"\\\\|,.<>\\/?]).+$"))
    .required()
    .messages({
      "string.empty": "Password is required",
      "string.min": "Password must be at least 8 characters",
      "string.max": "Password cannot exceed 30 characters",
      "string.pattern.base":
        "Password must contain at least one lowercase letter, one uppercase letter, one number, and one special character",
    }),

     avatarUrl: Joi.string()
    .uri()
    .required()
    .messages({
      "string.empty": "Avatar URL is required",
      "string.uri": "Avatar URL must be a valid URI",
    }),
});

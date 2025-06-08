import { Request, Response, NextFunction } from 'express';
import Joi from 'joi';

const registrationSchema = Joi.object({
  name: Joi.string().max(50).required().messages({
    'string.empty': 'Name is required.',
    'string.max': 'Name must not exceed 50 characters.',
  }),
  email: Joi.string().email().max(100).required().messages({
    'string.empty': 'Email is required.',
    'string.email': 'Email must be a valid email address.',
    'string.max': 'Email must not exceed 100 characters.',
  }),
  username: Joi.string().max(50).required().messages({
    'string.empty': 'Username is required.',
    'string.max': 'Username must not exceed 50 characters.',
  }),
  password: Joi.string().min(8).max(255).required().messages({
    'string.empty': 'Password is required.',
    'string.min': 'Password must be at least 8 characters long.',
    'string.max': 'Password must not exceed 255 characters.',
  }),
  roleId: Joi.number().integer().required().messages({
    'number.base': 'Role ID must be a number.',
    'any.required': 'Role ID is required.',
  }),
  organizationId: Joi.number().integer().optional().messages({
    'number.base': 'Organization ID must be a number.',
  }),
});

export const validateRegistration = (req: Request, res: Response, next: NextFunction): void => {
  const { error } = registrationSchema.validate(req.body, { abortEarly: false });

  if (error) {
    const errorMessages = error.details.map((detail) => detail.message);
    res.status(400).json({ message: 'Validation failed', errors: errorMessages });
    return;
  }

  next();
};
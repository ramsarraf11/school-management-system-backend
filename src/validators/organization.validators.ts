import { body } from 'express-validator';

export const createOrganizationValidator = [
  body('orgName').notEmpty().withMessage('Organization name is required.').isLength({ max: 255 }).withMessage('Organization name must not exceed 255 characters.'),
  body('ownerName').notEmpty().withMessage('Owner name is required.').isLength({ max: 255 }).withMessage('Owner name must not exceed 255 characters.'),
  body('email').notEmpty().withMessage('Email is required.').isEmail().withMessage('Email must be a valid email address.').isLength({ max: 255 }).withMessage('Email must not exceed 255 characters.'),
  body('address').optional().isLength({ max: 500 }).withMessage('Address must not exceed 500 characters.'),
  body('phone').optional().matches(/^[0-9]{10}$/).withMessage('Phone number must be a valid 10-digit number.'),
  body('pinCode').optional().matches(/^[0-9]{6}$/).withMessage('Pin code must be a valid 6-digit number.'),
  body('panNo').optional().isLength({ max: 10 }).withMessage('PAN number must not exceed 10 characters.'),
  body('taxNo').optional().isLength({ max: 50 }).withMessage('Tax number must not exceed 50 characters.'),
  body('financialYearStart').optional().isISO8601().withMessage('Financial year start must be a valid date.'),
  body('financialYearEnd').optional().isISO8601().withMessage('Financial year end must be a valid date.'),
  body('country').optional().isLength({ max: 100 }).withMessage('Country name must not exceed 100 characters.'),
  body('state').optional().isLength({ max: 100 }).withMessage('State name must not exceed 100 characters.'),
  body('bankName').optional().isLength({ max: 255 }).withMessage('Bank name must not exceed 255 characters.'),
  body('accountNumber').optional().isLength({ max: 50 }).withMessage('Account number must not exceed 50 characters.'),
  body('branchName').optional().isLength({ max: 255 }).withMessage('Branch name must not exceed 255 characters.'),
  body('ifscCode').optional().isLength({ max: 11 }).withMessage('IFSC code must not exceed 11 characters.'),
  body('enableGST').notEmpty().withMessage('Enable GST is required.').isBoolean().withMessage('Enable GST must be a boolean value.'),
];

import { body } from 'express-validator';

export const validatePayrollPayment = [
  body('paymentMode').isString().notEmpty(),
  body('note').optional().isString(),
  body('receiptFileUrl').optional().isURL()
];

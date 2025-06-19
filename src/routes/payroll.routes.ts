import { Router } from 'express';
import * as PayrollController from '../controllers/payroll.controller';
import { validatePayrollPayment } from '../validators/payroll.validators';
import { validationResultHandler } from '../utils/validation.result.handler';

const router = Router();

router.get('/employee/:employeeId', PayrollController.getPayrollList);
router.patch('/:id/pay', validatePayrollPayment, validationResultHandler, PayrollController.payPayroll);

export default router;

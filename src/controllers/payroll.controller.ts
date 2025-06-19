import { Request, Response } from 'express';
import * as PayrollService from '../services/payroll.service';
import { ResponseHandler } from '../utils/response.handler';

export const getPayrollList = async (req: Request, res: Response) => {
  const employeeId = parseInt(req.params.employeeId);
  const payrolls = await PayrollService.getPayrollDetails(employeeId);
  ResponseHandler.success(req, res, 'Payroll list fetched', 200, payrolls);
};

export const payPayroll = async (req: Request, res: Response) => {
  const id = parseInt(req.params.id);
  const { paymentMode, note, receiptFileUrl } = req.body;
  const updated = await PayrollService.payPayroll(id, { paymentMode, note, receiptFileUrl });
  ResponseHandler.success(req, res, 'Payroll paid successfully', 200, updated);
};

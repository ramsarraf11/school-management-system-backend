import * as PayrollRepo from '../repositories/payroll.repository';

export const getPayrollDetails = async (employeeId: number) => {
  return await PayrollRepo.getPayrollsByEmployee(employeeId);
};

export const payPayroll = async (id: number, paymentData: {
  paymentMode: string;
  note?: string;
  receiptFileUrl?: string;
}) => {
  return await PayrollRepo.updatePayrollPayment(id, {
    status: 'PAID',
    paymentMode: paymentData.paymentMode,
    note: paymentData.note,
    receiptFileUrl: paymentData.receiptFileUrl
  });
};

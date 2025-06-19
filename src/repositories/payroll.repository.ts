import Payroll from '../models/payroll.model';

export const createPayroll = async (data: Partial<Payroll>) => {
  return await Payroll.create(data);
};

export const getPayrollsByEmployee = async (employeeId: number) => {
  return await Payroll.findAll({ where: { employeeId }, order: [['month', 'ASC']] });
};

export const updatePayrollPayment = async (id: number, data: Partial<Payroll>) => {
  return await Payroll.update(data, { where: { id } });
};

export const getPayrollById = async (id: number) => {
  return await Payroll.findByPk(id);
};

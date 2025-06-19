import { Request, Response } from 'express';
import {
  createEmployeeService,
  getEmployeeByIdService,
  updateEmployeeService,
  deleteEmployeeService,
  searchEmployeesService,
  getEmployeeByRoleIdOrName
} from '../services/employee.service';
import { ResponseHandler } from '../utils/response.handler';
import { Logger } from '../utils/logger';
import Payroll from '../models/payroll.model';
import PayrollPayment from '../models/payroll.model';

export const createEmployee = async (req: Request, res: Response): Promise<void> => {
  try {
    const employee = await createEmployeeService(req.body);
    ResponseHandler.success(req, res, 'Employee created successfully', 201, employee);
  } catch (error) {
    ResponseHandler.failure(req, res, 'Error creating employee', 500, error instanceof Error ? error : undefined);
  }
};

export const getEmployeeById = async (req: Request, res: Response): Promise<void> => {
  try {
    const employee = await getEmployeeByIdService(Number(req.params.id));
    if (!employee) {
      ResponseHandler.failure(req, res, 'Employee not found', 404);
      return;
    }
    ResponseHandler.success(req, res, 'Employee retrieved successfully', 200, employee);
  } catch (error) {
    ResponseHandler.failure(req, res, 'Error retrieving employee', 500, error instanceof Error ? error : undefined);
  }
};

export const updateEmployee = async (req: Request, res: Response): Promise<void> => {
  try {
    const employee = await updateEmployeeService(Number(req.params.id), req.body);
    ResponseHandler.success(req, res, 'Employee updated successfully', 200, employee);
  } catch (error) {
    ResponseHandler.failure(req, res, 'Error updating employee', 500, error instanceof Error ? error : undefined);
  }
};

export const deleteEmployee = async (req: Request, res: Response): Promise<void> => {
  try {
    await deleteEmployeeService(Number(req.params.id));
    ResponseHandler.success(req, res, 'Employee deleted successfully', 200);
  } catch (error) {
    ResponseHandler.failure(req, res, 'Error deleting employee', 500, error instanceof Error ? error : undefined);
  }
};

export const searchEmployees = async (req: Request, res: Response): Promise<void> => {
  try {
    const employees = await searchEmployeesService(req.query);
    ResponseHandler.success(req, res, 'Employees retrieved successfully', 200, employees);
  } catch (error) {
    ResponseHandler.failure(req, res, 'Error searching employees', 500, error instanceof Error ? error : undefined);
  }
};

// searchEmployeeByRoleOrName

export const getEmployeeByRoleOrName = async (req: Request, res: Response): Promise<void> => {
  try {
    const { roleId, name } = req.query;
    if (!roleId && !name) {
      ResponseHandler.failure(req, res, 'Please provide either roleId or name', 400);
      return;
    }

    const employees = await getEmployeeByRoleIdOrName(roleId, name);
    ResponseHandler.success(req, res, 'Employees retrieved successfully', 200, employees);
  }
  catch (error) {
    Logger.instance().log(error instanceof Error ? error.message : String(error));
    ResponseHandler.failure(req, res, 'Error updating organization', 500, error instanceof Error ? error : undefined);
  }
}

// controllers/payroll.controller.ts
export const createPayroll = async (req: Request, res: Response) => {
  const payroll = await Payroll.create(req.body); // validate req.body before
  return res.status(201).json(payroll);
};

export const getEmployeePayrolls = async (req: Request, res: Response) => {
  const { id } = req.params;
  const payrolls = await Payroll.findAll({ where: { employeeId: id } });
  return res.json(payrolls);
};

export const collectPayrollPayment = async (req: Request, res: Response): Promise<void> => {
  const { id } = req.params;
  const { paymentMode, note, fileUrl } = req.body;

  const payroll = await Payroll.findByPk(id);
  if (!payroll) {
    res.status(404).json({ error: 'Payroll not found' });
    return;
  }

  await PayrollPayment.create({ payrollId: id, paymentMode, note, fileUrl });
  payroll.status = 'PAID';
  await payroll.save();

  res.json({ message: 'Payment collected successfully' });
  return
};

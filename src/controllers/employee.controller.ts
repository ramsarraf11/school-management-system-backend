import { Request, Response } from 'express';
import {
  createEmployeeService,
  getEmployeeByIdService,
  updateEmployeeService,
  deleteEmployeeService,
  searchEmployeesService,
} from '../services/employee.service';
import { ResponseHandler } from '../utils/response.handler';

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
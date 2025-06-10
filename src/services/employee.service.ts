import Employee from '../models/employee.model';
import {
    createEmployee,
    getEmployeeById,
    updateEmployee,
    deleteEmployee,
    searchEmployees,
  } from '../repositories/employee.repository';
  
  export const createEmployeeService = async (data: Partial<Employee>) => {
    return await createEmployee(data);
  };
  
  export const getEmployeeByIdService = async (id: number) => {
    return await getEmployeeById(id);
  };
  
  export const updateEmployeeService = async (id: number, data: Partial<Employee>) => {
    return await updateEmployee(id, data);
  };
  
  export const deleteEmployeeService = async (id: number) => {
    return await deleteEmployee(id);
  };
  
  export const searchEmployeesService = async (query: Partial<Employee>) => {
    return await searchEmployees(query);
  };
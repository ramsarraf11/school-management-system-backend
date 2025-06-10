import { Router } from 'express';
import {
  createEmployee,
  getEmployeeById,
  updateEmployee,
  deleteEmployee,
  searchEmployees,
} from '../controllers/employee.controller';
import { authenticate } from '../middlewares/auth.middleware';
import { authorizeSchoolAdmin } from '../middlewares/role.middleware';

const employeeRoutes = Router();

employeeRoutes.post('/', authenticate, authorizeSchoolAdmin, createEmployee);
employeeRoutes.get('/:id', authenticate, authorizeSchoolAdmin, getEmployeeById);
employeeRoutes.put('/:id', authenticate, authorizeSchoolAdmin, updateEmployee);
employeeRoutes.delete('/:id', authenticate, authorizeSchoolAdmin, deleteEmployee);
employeeRoutes.get('/', authenticate, authorizeSchoolAdmin, searchEmployees);

export default employeeRoutes;
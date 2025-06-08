import { Router } from 'express';
import {
  createStudent,
  getAllStudents,
  getStudentById,
  updateStudent,
  deleteStudent,
} from '../controllers/student.controller';
import { authorizeSchoolAdmin } from '../middlewares/role.middleware';
import { authenticate } from '../middlewares/auth.middleware';

const studentRouter = Router();

studentRouter.post('/', authenticate,authorizeSchoolAdmin, createStudent);
studentRouter.get('/', authenticate, authorizeSchoolAdmin, getAllStudents);
studentRouter.get('/:id', authenticate, authorizeSchoolAdmin, getStudentById);
studentRouter.put('/:id', authenticate, authorizeSchoolAdmin, updateStudent);
studentRouter.delete('/:id', authenticate, authorizeSchoolAdmin, deleteStudent);

export default studentRouter;
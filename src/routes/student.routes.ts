import { Router } from 'express';
import {
  createStudent,
  getAllStudents,
  getStudentById,
  updateStudent,
  deleteStudent,
} from '../controllers/student.controller';
// import { authenticate } from '../middlewares/auth.middleware';
import { authorizeSchoolAdmin } from '../middlewares/role.middleware';
import { authenticate } from '../middlewares/auth.middleware';

const studentRouter = Router();

// Create a new student (only School Admins can onboard students)
studentRouter.post('/', authenticate, authorizeSchoolAdmin, createStudent);

// Get all students for the authorizeSchoolAdmind organization
studentRouter.get('/', authorizeSchoolAdmin, getAllStudents);

// Get a specific student by ID
studentRouter.get('/:id', authorizeSchoolAdmin, getStudentById);

// Update a student's details
studentRouter.put('/:id', authorizeSchoolAdmin, updateStudent);

// Delete a student
studentRouter.delete('/:id', authorizeSchoolAdmin, deleteStudent);

export default studentRouter;
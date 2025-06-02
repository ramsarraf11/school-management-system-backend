import { Request, Response } from 'express';
import {
  createStudentService,
  getAllStudentsService,
  getStudentByIdService,
  updateStudentService,
  deleteStudentService,
} from '../services/student.service';
import { handleSuccess, handleFailure } from '../utils/response.util';

export const createStudent = async (req: Request, res: Response) => {
  try {
    const { ecNumber, admissionNumber, udiseNumber, aadharNumber, panNumber, firstName, lastName, dateOfBirth, email, mobileNumber, class: studentClass, section, rollNumber, gender, religion } = req.body;
    const organizationId = req.user.organizationId; // Extract organizationId from the authenticated user

    const student = await createStudentService({
      ecNumber,
      admissionNumber,
      udiseNumber,
      aadharNumber,
      panNumber,
      firstName,
      lastName,
      dateOfBirth,
      email,
      mobileNumber,
      class: studentClass,
      section,
      rollNumber,
      gender,
      religion,
      organizationId,
    });

    handleSuccess(res, 'Student onboarded successfully', student);
  } catch (error) {
    if (error instanceof Error) {
      handleFailure(res, error.message, 400);
    } else {
      handleFailure(res, 'An unknown error occurred', 400);
    }
  }
};

export const getAllStudents = async (req: Request, res: Response) => {
  try {
    const organizationId = req.user.organizationId; // Extract organizationId from the authenticated user

    const students = await getAllStudentsService(organizationId);
    handleSuccess(res, 'Students retrieved successfully', students);
  } catch (error) {
    if (error instanceof Error) {
      handleFailure(res, error.message, 400);
    } else {
      handleFailure(res, 'An unknown error occurred', 400);
    }
  }
};

export const getStudentById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const organizationId = req.user.organizationId; // Extract organizationId from the authenticated user

    const student = await getStudentByIdService(Number(id), organizationId);
    if (!student) {
      handleFailure(res, 'Student not found', 404);
      return;
    }

    handleSuccess(res, 'Student retrieved successfully', student);
  } catch (error) {
    if (error instanceof Error) {
      handleFailure(res, error.message, 400);
    } else {
      handleFailure(res, 'An unknown error occurred', 400);
    }
  }
};

export const updateStudent = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const organizationId = req.user.organizationId; // Extract organizationId from the authenticated user

    const updatedStudent = await updateStudentService(Number(id), req.body, organizationId);
    handleSuccess(res, 'Student updated successfully', updatedStudent);
  } catch (error) {
    if (error instanceof Error) {
      handleFailure(res, error.message, 400);
    } else {
      handleFailure(res, 'An unknown error occurred', 400);
    }
  }
};

export const deleteStudent = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const organizationId = req.user.organizationId; // Extract organizationId from the authenticated user

    await deleteStudentService(Number(id), organizationId);
    handleSuccess(res, 'Student deleted successfully');
  } catch (error) {
    if (error instanceof Error) {
      handleFailure(res, error.message, 400);
    } else {
      handleFailure(res, 'An unknown error occurred', 400);
    }
  }
};
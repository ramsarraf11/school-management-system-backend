import {
    createStudent,
    getAllStudents,
    getStudentById,
    updateStudent,
    deleteStudent,
  } from '../repositories/student.repository';
  
  interface CreateStudentInput {
    ecNumber: string;
    admissionNumber: string;
    udiseNumber?: string;
    aadharNumber?: string;
    panNumber?: string;
    firstName: string;
    lastName: string;
    dateOfBirth: Date;
    email: string;
    mobileNumber?: string;
    class: string;
    section: string;
    rollNumber: string;
    gender: string;
    religion?: string;
    organizationId: number;
  }
  
  export const createStudentService = async (data: CreateStudentInput) => {
    return await createStudent(data);
  };
  
  export const getAllStudentsService = async (organizationId: number) => {
    return await getAllStudents(organizationId);
  };
  
  export const getStudentByIdService = async (id: number, organizationId: number) => {
    return await getStudentById(id, organizationId);
  };
  
  export const updateStudentService = async (id: number, data: Partial<CreateStudentInput>, organizationId: number) => {
    return await updateStudent(id, data, organizationId);
  };
  
  export const deleteStudentService = async (id: number, organizationId: number) => {
    return await deleteStudent(id, organizationId);
  };
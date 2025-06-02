import Student from '../models/student.model';

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

export const createStudent = async (data: any) => {
  return await Student.create(data);
};

export const getAllStudents = async (organizationId: number) => {
  return await Student.findAll({ where: { organizationId } });
};

export const getStudentById = async (id: number, organizationId: number) => {
  return await Student.findOne({ where: { id, organizationId } });
};

export const updateStudent = async (id: number, data: Partial<CreateStudentInput>, organizationId: number) => {
  const student = await Student.findOne({ where: { id, organizationId } });
  if (!student) {
    throw new Error('Student not found');
  }
  return await student.update(data);
};

export const deleteStudent = async (id: number, organizationId: number) => {
  const student = await Student.findOne({ where: { id, organizationId } });
  if (!student) {
    throw new Error('Student not found');
  }
  return await student.destroy();
};
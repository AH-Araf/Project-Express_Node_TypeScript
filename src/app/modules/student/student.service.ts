import { StudentModel } from '../student.model';
import { Student } from './student.interface';

//create new student
const createStudentIntoDB = async (student: Student) => {
  const result = await StudentModel.create(student);
  return result;
};

// get all student
const getAllStudentsFromDB = async () => {
  const result = await StudentModel.find();
  return result;
};

// get singlr student
const getSingleStudentFromDB = async (id: string) => {
  const result = await StudentModel.findOne({ id });
  return result;
};

export const StudentServices = {
  createStudentIntoDB,
  getAllStudentsFromDB,
  getSingleStudentFromDB,
};

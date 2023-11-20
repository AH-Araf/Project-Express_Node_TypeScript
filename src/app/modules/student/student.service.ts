import { Student } from '../student.model';
import { TStudent } from './student.interface';

//create new student
const createStudentIntoDB = async (studentData: TStudent) => {
  if (await Student.isUserExists(studentData.id)) {
    throw new Error('User already exists');
  }
  const result = await Student.create(studentData); //using built in static method

  //instance method for existing user to not save in DB
  // const student = new Student(studentData);
  // if (await student.isUserExists(studentData.id)) {
  //   throw new Error('User already exists');
  // }
  // const result = await student.save();
  return result;
};

// get all student
const getAllStudentsFromDB = async () => {
  const result = await Student.find();
  return result;
};

// get singlr student
const getSingleStudentFromDB = async (id: string) => {
  const result = await Student.findOne({ id });
  return result;
};

export const StudentServices = {
  createStudentIntoDB,
  getAllStudentsFromDB,
  getSingleStudentFromDB,
};


import { Student } from './student.model';



// get all student
const getAllStudentsFromDB = async () => {
  const result = await Student.find();
  return result;
};

// get singlr student
const getSingleStudentFromDB = async (id: string) => {
  //const result = await Student.findOne({ id });
  const result = await Student.aggregate([{ $match: { id: id } }]);
  return result;
};

// delete Student From DB
const deleteStudentFromDB = async (id: string) => {
  const result = await Student.updateOne({ id }, { isDeleted: true });
  return result;
};

export const StudentServices = {
  getAllStudentsFromDB,
  getSingleStudentFromDB,
  deleteStudentFromDB,
};

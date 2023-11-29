import { NextFunction, Request, Response } from 'express';
import { StudentServices } from './student.service';





const getAllStudents = async (req: Request, res: Response, next: NextFunction) => {
  try {
    // will call service function to get this data
    const result = await StudentServices.getAllStudentsFromDB();
    // send response
    res.status(200).json({
      success: true,
      message: 'Student are retrieved successfully',
      data: result,
    });
  } catch (err) {
    next(err)
  }
};

const getSingleStudent = async (req: Request, res: Response, next: NextFunction) => {
  try {
    // const studentId = req.params.studentId;
    const { studentId } = req.params;
    const result = await StudentServices.getSingleStudentFromDB(studentId);
    res.status(200).json({
      success: true,
      message: 'Single student is retrieved successfully',
      data: result,
    });
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (err) {
    next(err)
  }
};

const deleteStudent = async (req: Request, res: Response, next: NextFunction) => {
  try {
    // const studentId = req.params.studentId;
    const { studentId } = req.params;
    const result = await StudentServices.deleteStudentFromDB(studentId);
    res.status(200).json({
      success: true,
      message: 'Single student is deleted successfully',
      data: result,
    });
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (err) {
    next(err)
  }
};

export const StudentControllers = {
  getAllStudents,
  getSingleStudent,
  deleteStudent,
};

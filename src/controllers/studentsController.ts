import { Request, Response } from "express";
import { AppDataSource } from "../datasources/data-source";
import { Students } from "../models/students";
import {
  Body,
  Delete,
  Get,
  JsonController,
  Param,
  Post,
  Put,
  Req,
  Res,
  UseBefore,
  UseInterceptor,
} from "routing-controllers";
import { StudentsCreateMiddleware } from "../middlewares/studentsMiddleware";
import { validate } from "class-validator";
import { StudentInterceptor } from "../interceptors/studentInterceptor";

// export class StudentsController {
//   static async getAllStudents(req: Request, res: Response) {
//     try {
//       const allStudents = await AppDataSource.manager.find(Students);
//       res.status(200).json({
//         status: "Successfully retrived the Students Details",
//         data: allStudents,
//       });
//     } catch (err: any) {
//       res.status(400).json({
//         status: "Failed",
//         error: err.message,
//       });
//     }
//   }

//   static async createNewStudent(req: Request, res: Response) {
//     const {
//       studentID,
//       studentFName,
//       studentLName,
//       dateOfBirth,
//       email,
//       department,
//     } = req.body;
//     try {
//       const studentData = await AppDataSource.manager.insert(Students, {
//         studentID,
//         studentFName,
//         studentLName,
//         dateOfBirth,
//         email,
//         department,
//       });

//       console.log("*********Created Student*********", studentData);
//       await AppDataSource.manager.save(studentData);

//       res.status(200).send(studentData);
//     } catch (err: any) {
//       res.status(400).json({
//         error: err.message,
//       });
//     }
//   }

//   static async getStudentById(req: Request, res: Response) {
//     try {
//       const { studentID } = req.params;
//       const selectedStudent = await AppDataSource.manager.findOneBy(Students, {
//         studentID: studentID as any,
//       });
//       if (!selectedStudent) {
//         res.status(404).json({
//           status: "Failed",
//           error: "Student Not found",
//         });
//         return;
//       }
//       res.status(200).json({
//         status: "Successful",
//         data: selectedStudent,
//       });
//     } catch (err: any) {
//       res.status(400).json({
//         status: "Failed",
//         error: err.message,
//       });
//     }
//   }

//   static async updateStudentById(req: Request, res: Response) {
//     try {
//       const { studentID } = req.params;
//       await AppDataSource.manager.update(
//         Students,
//         { studentID: studentID },
//         req.body
//       );
//       const updatedStudent = await AppDataSource.manager.findOneBy(Students, {
//         studentID: studentID as any,
//       });
//       if (!updatedStudent) {
//         res.status(404).json({
//           status: "Failed",
//           error: "Student Not found",
//         });
//       }
//       res.status(200).json({
//         status: "Successful",
//         data: updatedStudent,
//       });
//     } catch (err: any) {
//       res.status(400).json({
//         status: "Failed",
//         error: err.message,
//       });
//     }
//   }

//   static async deleteStudentById(req: Request, res: Response) {
//     try {
//       const { studentID } = req.params;
//       const deteltedStudent = await AppDataSource.manager.delete(Students, {
//         studentID: studentID,
//       });
//       if (deteltedStudent.affected === 0) {
//         res.status(404).json({
//           status: "Failed",
//           error: "Student not found",
//         });
//       }
//       res.status(200).json({
//         status: "Successful",
//         message: "Student deleted successfully",
//       });
//     } catch (err: any) {
//       res.status(400).json({
//         status: "Failed",
//         error: err.message,
//       });
//     }
//   }
// }

@JsonController("/students")
@UseInterceptor(StudentInterceptor)
export class StudentsController {
  @Get("/:studentID")
  async getStudentByID(
    @Param("studentID") studentId: number,
    @Req() req: Request,
    @Res() res: Response
  ) {
    try {
      const selectedStudent = await AppDataSource.manager.findOneBy(Students, {
        studentID: studentId as any,
      });
      return res.status(200).json({
        status: "Success",
        data: selectedStudent,
      });
    } catch (err: any) {
      return res.status(500).json({
        message: "Error selecting the student data",
        error: err.message,
      });
    }
  }

  @Put("/:studentID")
  async updateStudent(
    @Param("studentID") studentID: number,
    @Req() req: Request,
    @Res() res: Response
  ) {
    try {
      await AppDataSource.manager.update(
        Students,
        { studentID: studentID },
        req.body
      );

      const updatedStudent = await AppDataSource.manager.findOneBy(Students, {
        studentID: studentID as number,
      });
      return res.status(200).json({
        status: "Successful",
        data: updatedStudent,
      });
    } catch (error: any) {
      return res.status(400).json({
        status: "Failed",
        error: error.message,
      });
    }
  }

  @Delete("/:studentID")
  async deleteStudent(
    @Param("studentID") studentID: number,
    @Req() req: Request,
    @Res() res: Response
  ) {
    try {
      const deteltedStudent = await AppDataSource.manager.delete(Students, {
        studentID: studentID,
      });
      if (deteltedStudent.affected === 0) {
        return res.status(404).json({
          status: "Failed",
          error: "Student not found",
        });
      }
      return res.status(200).json({
        status: "Successful",
        message: "Student deleted successfully",
      });
    } catch (error: any) {
      return res.status(400).json({
        status: "Failed",
        error: error.message,
      });
    }
  }
  @Get("/")
  async getAllStudents(@Req() req: Request, @Res() res: Response) {
    try {
      const allStudents = await AppDataSource.manager.find(Students);
      return res.status(200).json({
        status: "Successfully retrived the Students Details",
        data: allStudents,
      });
    } catch (error: any) {
      return res.status(400).json({
        status: "Failed",
        error: error.message,
      });
    }
  }

  @UseBefore(StudentsCreateMiddleware)
  @Post("/")
  async createNewStudent(@Body() studentData: Students, @Res() res: Response) {
    const student: Students = new Students();
    const {
      studentID,
      studentFName,
      studentLName,
      dateOfBirth,
      email,
      department,
    } = studentData;

    student.studentID = studentID;
    student.studentFName = studentFName;
    student.studentLName = studentLName;
    student.dateOfBirth = dateOfBirth;
    student.email = email;
    student.department = department;

    try {
      const errors = await validate(student, {
        validationError: { target: false },
      });

      if (errors.length > 0) {
        const formatError = errors.map((error) => {
          return {
            property: error.property,
            value: error.value,
            constraints: error.constraints,
          };
        });
        return res.status(400).json({
          message: "Validation Failed",
          errors: formatError,
        });
      }
      await AppDataSource.getRepository(Students).save(student);
      return res.status(200).json({
        status: "Student create Successfully",
        data: student,
      });
    } catch (err: any) {
      return res
        .status(500)
        .json({ message: "Error saving student", error: err.message });
    }
  }
}

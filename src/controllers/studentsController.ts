import { Request, Response } from "express";
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
import { StudentInterceptor } from "../interceptors/studentInterceptor";
import { Inject, Service } from "typedi";
import { StudentService } from "../services/studentServices";
import { NotFoundError, ValidationError } from "../errors/customeError";

/* //Using default routing file
export class StudentsController {
  static async getAllStudents(req: Request, res: Response) {
    try {
      const allStudents = await AppDataSource.manager.find(Students);
      res.status(200).json({
        status: "Successfully retrived the Students Details",
        data: allStudents,
      });
    } catch (err: any) {
      res.status(400).json({
        status: "Failed",
        error: err.message,
      });
    }
  }

  static async createNewStudent(req: Request, res: Response) {
    const {
      studentID,
      studentFName,
      studentLName,
      dateOfBirth,
      email,
      student,
    } = req.body;
    try {
      const studentData = await AppDataSource.manager.insert(Students, {
        studentID,
        studentFName,
        studentLName,
        dateOfBirth,
        email,
        student,
      });

      console.log("*********Created Student*********", studentData);
      await AppDataSource.manager.save(studentData);

      res.status(200).send(studentData);
    } catch (err: any) {
      res.status(400).json({
        error: err.message,
      });
    }
  }

  static async getStudentById(req: Request, res: Response) {
    try {
      const { studentID } = req.params;
      const selectedStudent = await AppDataSource.manager.findOneBy(Students, {
        studentID: studentID as any,
      });
      if (!selectedStudent) {
        res.status(404).json({
          status: "Failed",
          error: "Student Not found",
        });
        return;
      }
      res.status(200).json({
        status: "Successful",
        data: selectedStudent,
      });
    } catch (err: any) {
      res.status(400).json({
        status: "Failed",
        error: err.message,
      });
    }
  }

  static async updateStudentById(req: Request, res: Response) {
    try {
      const { studentID } = req.params;
      await AppDataSource.manager.update(
        Students,
        { studentID: studentID },
        req.body
      );
      const updatedStudent = await AppDataSource.manager.findOneBy(Students, {
        studentID: studentID as any,
      });
      if (!updatedStudent) {
        res.status(404).json({
          status: "Failed",
          error: "Student Not found",
        });
      }
      res.status(200).json({
        status: "Successful",
        data: updatedStudent,
      });
    } catch (err: any) {
      res.status(400).json({
        status: "Failed",
        error: err.message,
      });
    }
  }

  static async deleteStudentById(req: Request, res: Response) {
    try {
      const { studentID } = req.params;
      const deteltedStudent = await AppDataSource.manager.delete(Students, {
        studentID: studentID,
      });
      if (deteltedStudent.affected === 0) {
        res.status(404).json({
          status: "Failed",
          error: "Student not found",
        });
      }
      res.status(200).json({
        status: "Successful",
        message: "Student deleted successfully",
      });
    } catch (err: any) {
      res.status(400).json({
        status: "Failed",
        error: err.message,
      });
    }
  }
} */

/* //With using Routing-Controllers
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
      dtudent,
    } = studentData;

    student.studentID = studentID;
    student.studentFName = studentFName;
    student.studentLName = studentLName;
    student.dateOfBirth = dateOfBirth;
    student.email = email;
    student.dtudent = dtudent;

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
} */

//Using TypeDI Dependency Injector
@JsonController("/students")
@UseInterceptor(StudentInterceptor)
@Service()
export class StudentsController {
  @Inject()
  private studentService!: StudentService;

  @Get("/:studentID")
  async getStudentById(
    @Param("studentID") studentID: number,
    @Res() res: Response
  ) {
    try {
      const student = await this.studentService.getStudentById(studentID);
      return res.status(200).json({
        status: "Successful",
        data: student,
      });
    } catch (error: any) {
      if (error instanceof NotFoundError) {
        return res.status(404).json({
          status: "Failed",
          error: error.message,
        });
      }
      return res.status(400).json({
        status: "Failed",
        error: error.message,
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
      const updatedStudent = await this.studentService.updateStudentById(
        studentID,
        req.body
      );
      return res.status(200).json({
        status: "Successful",
        data: updatedStudent,
      });
    } catch (error: any) {
      if (error instanceof NotFoundError) {
        return res.status(404).json({
          status: "Failed",
          error: error.message,
        });
      }
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
      await this.studentService.deleteStudentById(studentID);
      return res.status(200).json({
        status: "Successful",
        message: "Student deleted successfully",
      });
    } catch (error: any) {
      if (error instanceof NotFoundError) {
        return res.status(404).json({
          status: "Failed",
          error: error.message,
        });
      }
      return res.status(400).json({
        status: "Failed",
        error: error.message,
      });
    }
  }

  @Get("/")
  async getAllStudents(@Req() req: Request, @Res() res: Response) {
    try {
      const allStudents = await this.studentService.getAllStudents();
      return res.status(200).json({
        status: "Successfully retrieved the Students Details",
        data: allStudents,
      });
    } catch (error: any) {
      return res.status(400).json({
        status: "Failed to get all th Students data",
        error: error.message,
      });
    }
  }

  @UseBefore(StudentsCreateMiddleware)
  @Post("/")
  async createNewStudent(@Body() requestData: Students, @Res() res: Response) {
    try {
      const createdStudent = await this.studentService.createNewStudent(
        requestData
      );
      return res.status(200).json({
        status: "Students created Successfully",
        data: createdStudent,
      });
    } catch (error: any) {
      if (error instanceof ValidationError) {
        return res.status(400).json(JSON.parse(error.message));
      }
      return res
        .status(500)
        .json({ message: "Error saving Student", error: error.message });
    }
  }
}

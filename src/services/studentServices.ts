import "reflect-metadata";
import { Service } from "typedi";
import { AppDataSource } from "../datasources/data-source";
import { Students } from "../models/students";
import { validate } from "class-validator";
import { ValidationError, NotFoundError } from "../errors/customeError";

@Service()
export class StudentService {
  async getAllStudents() {
    try {
      return await AppDataSource.manager.find(Students);
    } catch (error) {
      throw new Error("Error to fetch all the Students");
    }
  }

  async createNewStudent(studentData: Students) {
    const student = new Students();
    Object.assign(student, studentData);

    const errors = await validate(student, {
      validationError: { target: false },
    });

    if (errors.length > 0) {
      const formattedErrors = errors.map((error) => ({
        property: error.property,
        value: error.value,
        constraints: error.constraints,
      }));
      throw new ValidationError(
        JSON.stringify({
          message: "Validation Failed",
          errors: formattedErrors,
        })
      );
    }
    try {
      return await AppDataSource.getRepository(Students).save(student);
    } catch (error) {
      throw new Error(`Error saving Student`);
    }
  }

  async getStudentById(studentID: number) {
    try {
      const student = await AppDataSource.manager.findOneBy(Students, {
        studentID,
      });
      if (!student) {
        throw new NotFoundError("Student not found");
      }
      return student;
    } catch (error) {
      if (error instanceof NotFoundError) {
        throw error;
      }
      throw new Error("Error fetching Student by ID");
    }
  }

  async updateStudentById(studentID: number, updateData: Partial<Students>) {
    try {
      await AppDataSource.manager.update(Students, { studentID }, updateData);
      const updatedStudent = await AppDataSource.manager.findOneBy(Students, {
        studentID,
      });
      if (!updatedStudent) {
        throw new NotFoundError("Student not found");
      }
      return updatedStudent;
    } catch (error) {
      if (error instanceof NotFoundError) {
        throw error;
      }
      throw new Error("Error updating Student record");
    }
  }

  async deleteStudentById(studentID: number) {
    try {
      const deleteResult = await AppDataSource.manager.delete(Students, {
        studentID,
      });
      if (deleteResult.affected === 0) {
        throw new NotFoundError("Student not found");
      }
      return deleteResult;
    } catch (error) {
      if (error instanceof NotFoundError) {
        throw error;
      }
      throw new Error("Error deleting Student record");
    }
  }
}

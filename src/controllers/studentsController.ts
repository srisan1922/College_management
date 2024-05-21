import express from "express";
import { Request, Response } from "express";
import { AppDataSource } from "../datasources/data-source";
import { Students } from "../models/students";

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
      department,
    } = req.body;
    try {
      const studentData = await AppDataSource.manager.insert(Students, {
        studentID,
        studentFName,
        studentLName,
        dateOfBirth,
        email,
        department,
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
}

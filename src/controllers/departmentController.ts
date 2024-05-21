import express from "express";
import { Request, Response } from "express";
import { AppDataSource } from "../datasources/data-source";
import { Department } from "../models/departments";

export class DepartmentController {
  static async getAllDepartment(req: Request, res: Response) {
    try {
      const allDepartment = await AppDataSource.manager.find(Department);
      res.status(200).json({
        status: "Successfully retrived the Department Details",
        data: allDepartment,
      });
    } catch (err: any) {
      res.status(400).json({
        status: "Failed",
        error: err.message,
      });
    }
  }

  static async createNewDepartment(req: Request, res: Response) {
    const {
      departmentID,
      departmentName,
      headOfTheDepartment,
      officeLocation,
      contactNumber,
    } = req.body;
    try {
      const DepartmentData = await AppDataSource.manager.insert(Department, {
        departmentID,
        departmentName,
        headOfTheDepartment,
        officeLocation,
        contactNumber,
      });

      console.log("*********Created Department*********", DepartmentData);

      res.status(200).send(DepartmentData);
    } catch (err: any) {
      res.status(400).json({
        error: err.message,
      });
    }
  }

  static async getDepartmentById(req: Request, res: Response) {
    try {
      const { departmentID } = req.params;
      const selectedDepartment = await AppDataSource.manager.findOneBy(
        Department,
        {
          departmentID: departmentID as any,
        }
      );
      if (!selectedDepartment) {
        res.status(404).json({
          status: "Failed",
          error: "Department Not found",
        });
        return;
      }
      res.status(200).json({
        status: "Successful",
        data: selectedDepartment,
      });
    } catch (err: any) {
      res.status(400).json({
        status: "Failed",
        error: err.message,
      });
    }
  }

  static async updateDepartmentById(req: Request, res: Response) {
    try {
      const { departmentID } = req.params;
      await AppDataSource.manager.update(
        Department,
        { departmentID: departmentID },
        req.body
      );
      const updatedDepartment = await AppDataSource.manager.findOneBy(
        Department,
        {
          departmentID: departmentID as any,
        }
      );
      if (!updatedDepartment) {
        res.status(404).json({
          status: "Failed",
          error: "Department Not found",
        });
      }
      res.status(200).json({
        status: "Successful",
        data: updatedDepartment,
      });
    } catch (err: any) {
      res.status(400).json({
        status: "Failed",
        error: err.message,
      });
    }
  }

  static async deleteDepartmentById(req: Request, res: Response) {
    try {
      const { DepartmentID } = req.params;
      const deteltedDepartment = await AppDataSource.manager.delete(
        Department,
        {
          DepartmentID: DepartmentID,
        }
      );
      if (deteltedDepartment.affected === 0) {
        res.status(404).json({
          status: "Failed",
          error: "Department not found",
        });
      }
      res.status(200).json({
        status: "Successful",
        message: "Department deleted successfully",
      });
    } catch (err: any) {
      res.status(400).json({
        status: "Failed",
        error: err.message,
      });
    }
  }
}

import "reflect-metadata";
import { Service } from "typedi";
import { AppDataSource } from "../datasources/data-source";
import { Department } from "../models/departments";
import { validate } from "class-validator";
import { ValidationError, NotFoundError } from "../errors/customeError";

@Service()
export class DepartmentService {
  async getAllDepartments() {
    try {
      return await AppDataSource.manager.find(Department);
    } catch (error) {
      throw new Error("Error to fetch all the Department");
    }
  }

  async createNewDepartment(departmentData: Department) {
    const department = new Department();
    Object.assign(department, departmentData);

    const errors = await validate(department, {
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
      return await AppDataSource.getRepository(Department).save(department);
    } catch (error) {
      throw new Error(`Error saving department`);
    }
  }

  async getDepartmentById(departmentID: number) {
    try {
      const department = await AppDataSource.manager.findOneBy(Department, {
        departmentID,
      });
      if (!department) {
        throw new NotFoundError("Department not found");
      }
      return department;
    } catch (error) {
      if (error instanceof NotFoundError) {
        throw error;
      }
      throw new Error("Error fetching department by ID");
    }
  }

  async updateDepartmentById(
    departmentID: number,
    updateData: Partial<Department>
  ) {
    try {
      await AppDataSource.manager.update(
        Department,
        { departmentID },
        updateData
      );
      const updatedDepartment = await AppDataSource.manager.findOneBy(
        Department,
        { departmentID }
      );
      if (!updatedDepartment) {
        throw new NotFoundError("Department not found");
      }
      return updatedDepartment;
    } catch (error) {
      if (error instanceof NotFoundError) {
        throw error;
      }
      throw new Error("Error updating department");
    }
  }

  async deleteDepartmentById(departmentID: number) {
    try {
      const deleteResult = await AppDataSource.manager.delete(Department, {
        departmentID,
      });
      if (deleteResult.affected === 0) {
        throw new NotFoundError("Department not found");
      }
      return deleteResult;
    } catch (error) {
      if (error instanceof NotFoundError) {
        throw error;
      }
      throw new Error("Error deleting department");
    }
  }
}

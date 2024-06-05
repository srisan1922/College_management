import express, { Request, Response } from "express";
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
} from "routing-controllers";
import { Inject } from "typedi";
import { DepartmentService } from "../services/departmentServices";
import { ValidationError, NotFoundError } from "../errors/customeError";
import { Department } from "../models/departments";

/* Without using Routing-Controllers
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
} */

/* //With using Routing-Controllers
@Controller("/departments")
export class DepartmentController {
  @Get("/")
  async getAllDepartment(@Req() req: Request, @Res() res: Response) {
    try {
      const allDepartment = await AppDataSource.manager.find(Department);
      return res.status(200).json({
        status: "Successfully retrived the Department Details",
        data: allDepartment,
      });
    } catch (error: any) {
      return res.status(400).json({
        status: "Failed",
        error: error.message,
      });
    }
  }

  @Post("/")
  async createNewDepartment(
    @Body() requestData: Department,
    @Res() res: Response
  ) {
    const department: Department = new Department();
    const {
      departmentID,
      departmentName,
      headOfTheDepartment,
      officeLocation,
      contactNumber,
    } = requestData;

    department.departmentID = departmentID;
    department.departmentName = departmentName;
    department.headOfTheDepartment = headOfTheDepartment;
    department.officeLocation = officeLocation;
    department.contactNumber = contactNumber;
    try {
      const errors = await validate(department, {
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
      const createdDepartment = await AppDataSource.getRepository(
        Department
      ).save(department);
      return res.status(200).json({
        status: "Department create Successfully",
        data: createdDepartment,
      });
    } catch (error: any) {
      return res
        .status(500)
        .json({ message: "Error saving department", error: error.message });
    }
  }

  @Put("/:departmentID")
  async updateDepartment(
    @Param("departmentID") departmentID: number,
    @Req() req: Request,
    @Res() res: Response
  ) {
    try {
      await AppDataSource.manager.update(
        Department,
        { departmentID: departmentID },
        req.body
      );
      const updatedDepartment = await AppDataSource.manager.findOneBy(
        Department,
        { departmentID: departmentID as number }
      );
      return res.status(200).json({
        status: "Successful",
        data: updatedDepartment,
      });
    } catch (error: any) {
      return res.status(400).json({
        status: "Failed",
        error: error.message,
      });
    }
  }

  @Delete("/:departmentID")
  async deleteDepartment(
    @Param("departmentID") departmentID: number,
    @Req() req: Request,
    @Res() res: Response
  ) {
    try {
      const deteltedDepartment = await AppDataSource.manager.delete(
        Department,
        {
          DepartmentID: departmentID,
        }
      );

      return res.status(200).json({
        status: "Successful",
        message: "Department deleted successfully",
      });
    } catch (error: any) {
      return res.status(400).json({
        status: "Failed",
        error: error.message,
      });
    }
  }
} */

//Using TypeDI Services
@JsonController("/departments")
export class DepartmentController {
  @Inject()
  private departmentService!: DepartmentService;

  @Get("/")
  async getAllDepartment(@Req() req: Request, @Res() res: Response) {
    try {
      const allDepartment = await this.departmentService.getAllDepartments();
      return res.status(200).json({
        status: "Successfully retrieved the Department Details",
        data: allDepartment,
      });
    } catch (error: any) {
      return res.status(400).json({
        status: "Failed to get all th department data",
        error: error.message,
      });
    }
  }

  @Post("/")
  async createNewDepartment(
    @Body() requestData: Department,
    @Res() res: Response
  ) {
    try {
      const createdDepartment =
        await this.departmentService.createNewDepartment(requestData);
      return res.status(200).json({
        status: "Department created Successfully",
        data: createdDepartment,
      });
    } catch (error: any) {
      if (error instanceof ValidationError) {
        return res.status(400).json(JSON.parse(error.message));
      }
      return res
        .status(500)
        .json({ message: "Error saving department", error: error.message });
    }
  }

  @Get("/:departmentID")
  async getDepartmentById(
    @Param("departmentID") departmentID: number,
    @Res() res: Response
  ) {
    try {
      const department = await this.departmentService.getDepartmentById(
        departmentID
      );
      return res.status(200).json({
        status: "Successful",
        data: department,
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

  @Put("/:departmentID")
  async updateDepartment(
    @Param("departmentID") departmentID: number,
    @Req() req: Request,
    @Res() res: Response
  ) {
    try {
      const updatedDepartment =
        await this.departmentService.updateDepartmentById(
          departmentID,
          req.body
        );
      return res.status(200).json({
        status: "Successful",
        data: updatedDepartment,
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

  @Delete("/:departmentID")
  async deleteDepartment(
    @Param("departmentID") departmentID: number,
    @Req() req: Request,
    @Res() res: Response
  ) {
    try {
      await this.departmentService.deleteDepartmentById(departmentID);
      return res.status(200).json({
        status: "Successful",
        message: "Department deleted successfully",
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
}

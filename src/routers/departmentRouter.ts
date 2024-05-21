import express from "express";
import { DepartmentController } from "../controllers/departmentController";
import {
  DepartmentMiddleware,
  DepartmentCreateMiddleware,
} from "../middlewares/departmentMiddleware";

export class DepartmentRouter {
  router: express.Router;

  constructor() {
    this.router = express.Router();
    this.departmentRouter();
  }

  departmentRouter() {
    this.router.use(DepartmentMiddleware);
    this.router.get("/:courseId", DepartmentController.getDepartmentById);
    this.router.put("/:courseId", DepartmentController.updateDepartmentById);
    this.router.delete("/:courseId", DepartmentController.deleteDepartmentById);
    this.router.get("/", DepartmentController.getAllDepartment);
    this.router.post(
      "/",
      DepartmentCreateMiddleware,
      DepartmentController.createNewDepartment
    );
  }
}

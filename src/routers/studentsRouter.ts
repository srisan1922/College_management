import express from "express";
import { StudentsController } from "../controllers/studentsController";
import {
  StudentsMiddleware,
  StudentsCreateMiddleware,
} from "../middlewares/studentsMiddleware";

export class StudentRouter {
  router: express.Router;

  constructor() {
    this.router = express.Router();
    this.studentRouter();
  }

  studentRouter() {
    this.router.use(StudentsMiddleware);
    this.router.get("/:studentId", StudentsController.getStudentById);
    this.router.put("/:studentId", StudentsController.updateStudentById);
    this.router.delete("/:studentId", StudentsController.deleteStudentById);
    this.router.get("/", StudentsController.getAllStudents);
    this.router.post(
      "/",
      StudentsCreateMiddleware,
      StudentsController.createNewStudent
    );
  }
}

import express from "express";
import { CourseController } from "../controllers/coursesController";
import {
  CoursesMiddleware,
  CoursesCreateMiddleware,
} from "../middlewares/courseMiddleware";

export class CourseRouter {
  router: express.Router;

  constructor() {
    this.router = express.Router();
    this.courseRouter();
  }

  courseRouter() {
    this.router.use(CoursesMiddleware);
    this.router.get("/:courseId", CourseController.getCourseById);
    this.router.put("/:courseId", CourseController.updateCourseById);
    this.router.delete("/:courseId", CourseController.deleteCourseById);
    this.router.get("/", CourseController.getAllCourses);
    this.router.post(
      "/",
      CoursesCreateMiddleware,
      CourseController.createNewCourse
    );
  }
}

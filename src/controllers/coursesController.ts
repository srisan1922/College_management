import { Request, Response } from "express";
import axios from "axios";

export class CourseController {
  static async getAllCourses(req: Request, res: Response) {
    axios
      .get("https://collegemanagement.free.beeceptor.com/courses")
      .then((response) => {
        const allCourses = response.data;
        console.log(allCourses);
        res.status(200).send(allCourses);
      })
      .catch((error) => {
        console.log("There was an error fetching the courses!", error.message);
        res.status(400).json({
          status: "Failed",
          error: error?.message ? error?.message : error,
        });
      });
  }

  static async createNewCourse(req: Request, res: Response) {
    const { courseID, courseName, description, credits, instructor } = req.body;
    const courseData = {
      courseID,
      courseName,
      description,
      credits,
      instructor,
    };

    axios
      .post("https://collegemanagement.free.beeceptor.com/courses", courseData)
      .then((response) => {
        const createdCourse = response.data;
        console.log("Created course details", createdCourse);
        res.status(200).send(createdCourse);
      })
      .catch((error) => {
        console.log("There was an error fetching the courses!", error?.message);
        res.status(400).json({
          status: "Failed",
          error: error?.message ? error?.message : error,
        });
      });
  }

  static async getCourseById(req: Request, res: Response) {
    const { courseID } = req.params;
    axios
      .get(`https://collegemanagement.free.beeceptor.com/courses/${courseID}`)
      .then((response) => {
        const courseById = response.data;
        console.log(`Fetched the data of course by id ${courseID}`, courseById);
        res.status(200).send(courseById);
      })
      .catch((error) => {
        console.log(
          `There was an error fetching the course with ID ${courseID}!`,
          error?.message
        );
        res.status(400).json({
          status: "Failed",
          error: error?.message ? error?.message : error,
        });
      });
  }

  static async updateCourseById(req: Request, res: Response) {
    const { courseID } = req.params;
    const { courseName, description, credits, instructor } = req.body;
    const courseData = {
      courseName,
      description,
      credits,
      instructor,
    };
    axios
      .put(
        `https://collegemanagement.free.beeceptor.com/courses/${courseID}`,
        courseData
      )
      .then((response) => {
        const updatedCourse = response.data;
        console.log("Course updated successfully:", updatedCourse);
        res.status(200).send(updatedCourse);
      })
      .catch((error) => {
        console.log(
          `There was an error updating the course with ID ${courseID}!`,
          error?.message
        );
        res.status(400).json({
          status: "Failed",
          error: error?.message ? error?.message : error,
        });
      });
  }

  static async deleteCourseById(req: Request, res: Response) {
    const { courseID } = req.params;
    axios
      .delete(
        `https://collegemanagement.free.beeceptor.com/courses/${courseID}`
      )
      .then((response) => {
        const deteltedCourse = response.data;
        console.log("Course deleted successfully:", deteltedCourse);
        res.status(200).send(deteltedCourse);
      })
      .catch((error) => {
        console.log(
          `There was an error deleting the course with ID ${courseID}!`,
          error?.message
        );
        res.status(400).json({
          status: "Failed",
          error: error?.message ? error?.message : error,
        });
      });
  }
}

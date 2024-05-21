import express, { Application, NextFunction, Request, Response } from "express";
import "reflect-metadata";
import bodyParser from "body-parser";
import { AppMiddleware } from "./middlewares/appMiddleware";
import { StudentRouter } from "./routers/studentsRouter";
import { CourseRouter } from "./routers/coursesRouter";
import { DepartmentRouter } from "./routers/departmentRouter";
import { AppDataSource } from "./datasources/data-source";

class App {
  app: express.Express;
  constructor() {
    this.app = express();
    this.configureMiddleware();
    this.setupRouter();
  }

  configureMiddleware() {
    console.log("configure middleware");
    //Parsing all the request body to JSON formate
    this.app.use(bodyParser.json());
    //Parses incoming request bodies containing URL-encoded data
    this.app.use(bodyParser.urlencoded({ extended: true }));
    //Middleware common to all requests
    this.app.use(AppMiddleware);

    //error handling middleware
    this.app.use(
      (err: any, req: Request, res: Response, next: NextFunction) => {
        console.log(err);
        res.status(500).send("Something broke!");
      }
    );
  }

  setupRouter() {
    //Students routes
    this.app.use("/students", new StudentRouter().router);
    this.app.use("/courses", new CourseRouter().router);
    this.app.use("/department", new DepartmentRouter().router);

    //Handling Home page router for the College Managememt application
    //Always handle the base route at the last of api calls
    this.app.use("/", (req: Request, res: Response) => {
      console.log("initial stage");
      res.status(200).send("Welcome to the SGJ college of Technology");
    });
  }

  start() {
    const port = process.env.PORT || 3000;
    AppDataSource.initialize()
      .then(() => {
        //Mongo Db connection started
        console.log(`MongoDB server connected`);
      })
      .catch((err) => {
        console.log(err.message);
      });

    this.app.listen(port, () => {
      console.log(`Server is succesfully running in http://localhost:${port}`);
    });
  }
}

const app = new App();
app.start();

import express, { Application, NextFunction, Request, Response } from "express";
import "reflect-metadata";
import bodyParser from "body-parser";
import { useExpressServer } from "routing-controllers";
import { AppMiddleware } from "./middlewares/appMiddleware";
import { AppDataSource } from "./datasources/data-source";
import { StudentsController } from "./controllers/studentsController";
import { DepartmentController } from "./controllers/departmentController";
import axios from "axios";

class App {
  app: express.Express;
  AppMW = AppMiddleware;
  constructor() {
    this.app = express();
    this.configureMiddleware();
    // this.setupRouter();

    useExpressServer(this.app, {
      controllers: [StudentsController, DepartmentController],
    });

    this.configureAxiosInterceptor();
  }

  configureAxiosInterceptor() {
    //Request interceptor which intersepts before request hits the server
    axios.interceptors.request.use(
      (config) => {
        console.log("Request intercepted by Axios-Request-Interceptor");
        // Add custom headers to the request config
        console.log(`Veifying access token: ${config.headers["access-token"]}`);
        return config;
      },
      (error) => {
        console.log("Request interceptor encountered error");
        return Promise.reject(error);
      }
    );

    //Response interceptor which intersepts before response hits the client
    axios.interceptors.response.use(
      (response) => {
        console.log("Response intercepted by Axios-Response-Interceptor");
        // Add custom headers to the request config
        console.log(`Response data: ${response.data}`);
        return response;
      },
      (error) => {
        console.log("Response interceptor encountered error");
        return Promise.reject(error);
      }
    );
  }

  configureMiddleware() {
    console.log("configure middleware");
    //Parsing all the request body to JSON formate
    this.app.use(bodyParser.json());
    //Parses incoming request bodies containing URL-encoded data
    this.app.use(bodyParser.urlencoded({ extended: true }));

    //error handling middleware
    this.app.use(
      (err: any, req: Request, res: Response, next: NextFunction) => {
        console.log(err);
        res.status(500).send("Something broke!");
      }
    );
  }

  // setupRouter() {
  //   //Students routes
  //   this.app.use("/students", new StudentRouter().router);
  //   this.app.use("/courses", new CourseRouter().router);
  //   this.app.use("/department", new DepartmentRouter().router);

  //   //Handling Home page router for the College Managememt application
  //   //Always handle the base route at the last of api calls
  //   this.app.use("/", (req: Request, res: Response) => {
  //     console.log("initial stage");
  //     res.status(200).send("Welcome to the SGJ college of Technology");
  //   });
  // }

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

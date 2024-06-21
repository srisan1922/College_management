import express, { Request, Response, NextFunction } from "express";
import {
  ExpressMiddlewareInterface,
  Middleware,
  Req,
  Res,
} from "routing-controllers";
import { Service } from "typedi";

// export const CoursesMiddleware = (
//   req: express.Request,
//   res: express.Response,
//   next: express.NextFunction
// ) => {
//   console.log("Request intercepted by CoursesMiddleware");
//   next();
// };
@Service()
@Middleware({ type: "before" })
export class CoursesMiddleware implements ExpressMiddlewareInterface {
  use(@Req() req: Request, @Res() res: Response, next: NextFunction) {
    console.log("Request intercepted by Courses BEFORE Middleware");
    next();
  }
}

@Service()
@Middleware({ type: "before" })
export class CoursesCreateMiddleware implements ExpressMiddlewareInterface {
  use(@Req() req: Request, @Res() res: Response, next: NextFunction) {
    console.log("Request intercepted by CoursesCreate BEFORE Middleware");
    next();
  }
}
// export const CoursesCreateMiddleware = (
//   req: express.Request,
//   res: express.Response,
//   next: express.NextFunction
// ) => {
//   console.log("Request intercepted by CoursesCreateMiddleware");
//   next();
// };

import express, { Request, Response, NextFunction } from "express";
import {
  ExpressMiddlewareInterface,
  Middleware,
  Req,
  Res,
} from "routing-controllers";
import { Service } from "typedi";

// export const DepartmentMiddleware = (
//   req: express.Request,
//   res: express.Response,
//   next: express.NextFunction
// ) => {
//   console.log("Request intercepted by DepartmentMiddleware");
//   next();
// };

// export const DepartmentCreateMiddleware = (
//   req: express.Request,
//   res: express.Response,
//   next: express.NextFunction
// ) => {
//   console.log("Request intercepted by DepartmentCreateMiddleware");
//   next();
// };
@Service()
@Middleware({ type: "before" })
export class DepartmentMiddleware implements ExpressMiddlewareInterface {
  use(@Req() req: Request, @Res() res: Response, next: NextFunction) {
    console.log("Request intercepted by Department BEFORE Middleware");
    next();
  }
}

@Service()
@Middleware({ type: "before" })
export class DepartmentCreateMiddleware implements ExpressMiddlewareInterface {
  use(@Req() req: Request, @Res() res: Response, next: NextFunction) {
    console.log("Request intercepted by DepartmentCreate BEFORE Middleware");
    next();
  }
}

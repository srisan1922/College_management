import { Request, Response, NextFunction } from "express";
import { ExpressMiddlewareInterface, Middleware } from "routing-controllers";

@Middleware({ type: "before" })
export class StudentsMiddleware implements ExpressMiddlewareInterface {
  use(req: Request, res: Response, next: NextFunction) {
    console.log("Request intercepted by Students BEFORE Middleware");
    next();
  }
}

@Middleware({ type: "before" })
export class StudentsCreateMiddleware implements ExpressMiddlewareInterface {
  use(req: Request, res: Response, next: NextFunction) {
    console.log("Request intercepted by StudentsCreate BEFORE Middleware");
    next();
  }
}

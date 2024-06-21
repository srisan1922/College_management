import { Request, Response, NextFunction } from "express";
import { ExpressMiddlewareInterface, Middleware } from "routing-controllers";
import { Service } from "typedi";

@Service()
@Middleware({ type: "before" })
export class StudentsMiddleware implements ExpressMiddlewareInterface {
  use(req: Request, res: Response, next: NextFunction) {
    console.log("Request intercepted by Students BEFORE Middleware");
    next();
  }
}

@Service()
@Middleware({ type: "before" })
export class StudentsCreateMiddleware implements ExpressMiddlewareInterface {
  use(req: Request, res: Response, next: NextFunction) {
    console.log("Request intercepted by StudentsCreate BEFORE Middleware");
    next();
  }
}

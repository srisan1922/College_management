import { Request, Response, NextFunction } from "express";
import { ExpressMiddlewareInterface, Middleware } from "routing-controllers";

// export const AppMiddleware = (
//   req: Request,
//   res: Response,
//   next: NextFunction
// ) => {
//   console.log("Request interpetors of AppMiddleware");
//   const accessToken = req.headers["access-token"];

//   if (!accessToken || accessToken[0].trim() === "") {
//     return res.status(400).json({ error: "AccessToken missing or empty" });
//   }
//   // If AccessToken is present, continue to the next middleware or route handler
//   next();
// };

@Middleware({ type: "before" })
export class AppMiddleware implements ExpressMiddlewareInterface {
  use(req: Request, res: Response, next: NextFunction) {
    const accessToken = req.headers["access-token"];
    if (!accessToken || accessToken[0].trim() === "") {
      return res.status(400).json({ error: "AccessToken missing or empty" });
    }

    //If AccessToken is present, continue to the next middleware or route handler
    next();
  }
}

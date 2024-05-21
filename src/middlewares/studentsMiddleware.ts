import express from "express";

export const StudentsMiddleware = (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
) => {
  console.log("Request intercepted by StudentsMiddleware");
  next();
};

export const StudentsCreateMiddleware = (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
) => {
  console.log("Request intercepted by StudentsCreateMiddleware");
  next();
};

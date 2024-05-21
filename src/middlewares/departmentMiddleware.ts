import express from "express";

export const DepartmentMiddleware = (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
) => {
  console.log("Request intercepted by DepartmentMiddleware");
  next();
};

export const DepartmentCreateMiddleware = (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
) => {
  console.log("Request intercepted by DepartmentCreateMiddleware");
  next();
};

import express from "express";

export const CoursesMiddleware = (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
) => {
  console.log("Request intercepted by CoursesMiddleware");
  next();
};

export const CoursesCreateMiddleware = (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
) => {
  console.log("Request intercepted by CoursesCreateMiddleware");
  next();
};

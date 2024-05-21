import "reflect-metadata";
import { DataSource } from "typeorm";
import { Students } from "../models/students";
import { Courses } from "../models/courses";
import { Department } from "../models/departments";

export const AppDataSource = new DataSource({
  type: "mongodb",
  url: "mongodb+srv://sripavi96:cOZcsDB64GoOGt7v@cluster0.wzzl1hu.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0",
  useNewUrlParser: true,
  synchronize: true,
  logging: true,
  entities: [Students, Courses, Department],
});

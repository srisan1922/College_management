import { Controller, Get, UseBefore } from "routing-controllers";

@Controller("/")
export class CollegeController {
  @Get()
  getHomePage() {
    return "Welcome to SGJ College of Technology";
  }
}

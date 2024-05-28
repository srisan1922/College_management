import "reflect-metadata";
import {
  JsonController,
  Get,
  Req,
  Res,
  Param,
  QueryParam,
  Post,
  Body,
  BodyParam,
  HeaderParam,
  CookieParam,
  Session,
  CurrentUser,
} from "routing-controllers";
import { Request, Response } from "express";

class UserService {
  getUsers() {
    return ["user1", "user2", "user3"];
  }
}

interface User {
  id: number;
  name: string;
}

//Constructor Injuction
@JsonController("/users")
export class UserController {
  @Get("/")
  getAll() {
    return [
      { id: 1, name: "John Doe" },
      { id: 2, name: "Jane Doe" },
    ];
  }

  @Get("/:id")
  getOne(@Param("id") id: number) {
    return { id, name: `User ${id}` };
  }
}

@JsonController("/users")
export class UserRouter {
  constructor(private userService: UserService) {}

  @Get("/")
  getAll() {
    return this.userService.getUsers();
  }

  // Inject the raw request and response objects from the underlying HTTP library (e.g., Express).
  @Get("/")
  reqAndResData(@Req() req: Request, @Res() res: Response) {
    res.send("This is a raw request and response example");
  }

  //Inject a specific URL parameter by its name.
  @Get("/:id")
  getUser(@Param("id") id: number) {
    return `User with id: ${id}`;
  }

  //Inject a specific query parameter by its name.
  @Get("/")
  search(@QueryParam("term") term: string) {
    return `Search results for: ${term}`;
  }

  //Inject the entire request body.
  @Post("/")
  createUser(@Body() user: any) {
    return `User created: ${JSON.stringify(user)}`;
  }

  //Inject a specific property from the request body
  @Post("/")
  createUserByName(
    @BodyParam("name") name: string,
    @BodyParam("age") age: number
  ) {
    return `User created: ${name}, age: ${age}`;
  }

  //Inject a specific header value from the request.
  @Get("/")
  authenticate(@HeaderParam("authorization") token: string) {
    return `Token: ${token}`;
  }

  //Inject a specific cookie value from the request.
  @Get("/")
  getCookies(@CookieParam("sessionId") sessionId: string) {
    return `Session ID: ${sessionId}`;
  }

  //Inject the session object (if session management is set up).
  @Get("/")
  getSession(@Session() session: any) {
    return `Session data: ${JSON.stringify(session)}`;
  }

  //
  @Get("/")
  getProfile(@CurrentUser() user: User) {
    return `Current user: ${user.name}`;
  }
}

import { CreateUserDTO } from "../../../dtos/users";
import { User } from "../../../models/user";
import { HttpRequest, HttpResponse } from "../../protocols";

export interface ICreateUsersController {
  handle(
    httpRequest: HttpRequest<CreateUserDTO, void, void>
  ): Promise<HttpResponse<User>>;
}

export interface ICreateUserRepository {
  createUser(createUserDTO: CreateUserDTO): Promise<User>;
}

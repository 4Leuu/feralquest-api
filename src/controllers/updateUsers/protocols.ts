import { UpdateUserDTO } from "../../dtos/users";
import { User } from "../../models/user";
import { HttpRequest, HttpResponse } from "../protocols";

export interface IUpdateUsersController {
  handle(
    httpRequest: HttpRequest<UpdateUserDTO, void, void>
  ): Promise<HttpResponse<User>>;
}

export interface IUpdateUsersRepository {
  updateUsers(updateUserDTO: UpdateUserDTO): Promise<User>;
}

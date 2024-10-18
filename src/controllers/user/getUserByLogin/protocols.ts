import { User } from "@prisma/client";
import { SearchByloginDTO } from "../../../dtos/users";
import { HttpRequest, HttpResponse } from "../../protocols";

export interface getUserByLoginController {
  handle(
    httpRequest: HttpRequest<SearchByloginDTO, void, void>
  ): Promise<HttpResponse<User>>;
}

export interface getUserByLoginRepository {
  getUserByLogin(searchByLoginDTO: SearchByloginDTO): Promise<User>;
}

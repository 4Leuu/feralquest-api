import { User } from "@prisma/client";
import { SearchByIdDTO } from "../../../dtos/users";
import { HttpRequest, HttpResponse } from "../../protocols";

export interface IGetUsersByIdController {
  handle(
    httpRequest: HttpRequest<void, void, SearchByIdDTO>
  ): Promise<HttpResponse<User>>;
}

export interface IGetUsersByIdRepository {
  getUsersById(searchByIdDTO: SearchByIdDTO): Promise<User>;
}

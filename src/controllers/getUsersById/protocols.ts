import { User } from "../../models/user";
import { HttpRequest, HttpResponse } from "../protocols";

export interface IGetUsersByIdController {
  handle(
    httpRequest: HttpRequest<void, void, { id: string }>
  ): Promise<HttpResponse<User>>;
}

export interface IGetUsersByIdRepository {
  getUsersById(id: string): Promise<User>;
}

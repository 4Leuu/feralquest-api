import { User } from "@prisma/client";
import { HttpRequest, HttpResponse } from "../../protocols";
import { IGetUsersByIdController, IGetUsersByIdRepository } from "./protocols";
import { SearchByIdDTO } from "../../../dtos/users";

export class GetUsersByIdController implements IGetUsersByIdController {
  constructor(private readonly getUsersById: IGetUsersByIdRepository) {}
  async handle(
    httpRequest: HttpRequest<void, void, SearchByIdDTO>
  ): Promise<HttpResponse<User>> {
    try {
      if (!httpRequest.params) {
        return {
          statusCode: 400,
          body: "Please specify a params.",
        };
      }

      const user = await this.getUsersById.getUsersById(httpRequest.params);

      return {
        statusCode: 200,
        body: user,
      };
    } catch (error) {
      return {
        statusCode: 404,
        body: "Something went wrong. " + error,
      };
    }
  }
}

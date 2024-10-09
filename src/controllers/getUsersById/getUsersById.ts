import { User } from "../../models/user";
import { HttpRequest, HttpResponse } from "../protocols";
import { IGetUsersByIdController, IGetUsersByIdRepository } from "./protocols";

export class GetUsersByIdController implements IGetUsersByIdController {
  constructor(private readonly getUsersById: IGetUsersByIdRepository) {}
  async handle(
    httpRequest: HttpRequest<void, void, { id: string }>
  ): Promise<HttpResponse<User>> {
    try {
      if (!httpRequest.params?.id) {
        return {
          statusCode: 400,
          body: "Please specify a params.",
        };
      }

      console.log(httpRequest.params.id);

      const user = await this.getUsersById.getUsersById(httpRequest.params.id);

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

import { User } from "@prisma/client";
import { SearchByloginDTO } from "../../../dtos/users";
import { HttpRequest, HttpResponse } from "../../protocols";
import { getUserByLoginController } from "./protocols";
import { GetUserByLoginPrisma } from "../../../repositories/user/getUserByLogin/getUserByLogin";

export class GetUserByLoginController implements getUserByLoginController {
  constructor(private readonly getUserByLoginPrisma: GetUserByLoginPrisma) {}

  async handle(
    httpRequest: HttpRequest<SearchByloginDTO, void, void>
  ): Promise<HttpResponse<User>> {
    try {
      if (!httpRequest.body) {
        return {
          statusCode: 400,
          body: "Please specify a body.",
        };
      }
      const user = await this.getUserByLoginPrisma.getUserByLogin(
        httpRequest.body
      );

      return {
        statusCode: 200,
        body: user,
      };
    } catch (error) {
      return {
        statusCode: 500,
        body: "Something went wrong. " + error,
      };
    }
  }
}

import { UpdateUserDTO } from "../../../dtos/users";
import { User } from "../../../models/user";
import { PrismaUpdateUsersRepository } from "../../../repositories/user/updateUsers/prismaUpdateUsers";
import { HttpRequest, HttpResponse } from "../../protocols";
import { IUpdateUsersController } from "./protocols";

export class UpdateUserController implements IUpdateUsersController {
  constructor(
    private readonly updateUserRepository: PrismaUpdateUsersRepository
  ) {}

  async handle(
    httpRequest: HttpRequest<UpdateUserDTO, void, void>
  ): Promise<HttpResponse<User>> {
    try {
      if (!httpRequest.body) {
        return {
          statusCode: 400,
          body: "Please specify a body.",
        };
      }

      const user = await this.updateUserRepository.updateUsers(
        httpRequest.body
      );

      return {
        statusCode: 201,
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

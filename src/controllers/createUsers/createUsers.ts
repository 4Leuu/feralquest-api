import { CreateUserDTO } from "../../dtos/users";
import { User } from "../../models/user";
import { HttpRequest, HttpResponse } from "../protocols";
import { ICreateUserRepository, ICreateUsersController } from "./protocols";

export class CreateUserController implements ICreateUsersController {
  constructor(private readonly createUserRepository: ICreateUserRepository) {}
  async handle(
    httpRequest: HttpRequest<CreateUserDTO, void, void>
  ): Promise<HttpResponse<User>> {
    try {
      console.log(httpRequest);
      if (!httpRequest.body) {
        return {
          statusCode: 400,
          body: "Please specify a body.",
        };
      }

      const user = await this.createUserRepository.createUser(httpRequest.body);

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

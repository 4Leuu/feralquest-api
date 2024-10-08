import { PrismaClient } from "@prisma/client";
import { ICreateUserRepository } from "../../controllers/createUsers/protocols";
import { CreateUserDTO } from "../../dtos/users";
import { User } from "../../models/user";
import bcrypt from "bcrypt";

export class PrismaCreateUsers implements ICreateUserRepository {
  constructor(private readonly prisma: PrismaClient) {}

  async createUser(createUserDTO: CreateUserDTO): Promise<User> {
    const hashedPassword = await this.hashPassword(createUserDTO.password);

    const databaseEmail = await this.emailExistsOnDatabase(createUserDTO.email);

    if (databaseEmail) {
      throw new Error("Email already exists.");
    }

    return await this.prisma.user.create({
      data: {
        firstName: createUserDTO.firstName,
        lastName: createUserDTO.lastName,
        email: createUserDTO.email,
        password: hashedPassword,
      },
    });
  }

  private async hashPassword(password: string): Promise<string> {
    const hashedPassword = await bcrypt.hash(password, 10);
    return hashedPassword;
  }

  private async emailExistsOnDatabase(email: string): Promise<boolean> {
    const databaseEmail = await this.prisma.user.findUnique({
      where: {
        email: email,
      },
    });

    return !!databaseEmail;
  }
}

import { PrismaClient } from "@prisma/client";
import { User } from "../../models/user";
import { UpdateUserDTO } from "../../dtos/users";
import { IUpdateUsersRepository } from "../../controllers/updateUsers/protocols";
import bcrypt from "bcrypt";

export class PrismaUpdateUsersRepository implements IUpdateUsersRepository {
  constructor(private readonly prisma: PrismaClient) {}

  async updateUsers(updateUserDTO: UpdateUserDTO): Promise<User> {
    await this.emailExistsOnDatabase(updateUserDTO.email ?? "");

    if (updateUserDTO.password) {
      updateUserDTO.password = await this.hashPassword(updateUserDTO.password);
    }

    const updatedUser = await this.prisma.user.update({
      where: {
        id: updateUserDTO.id,
      },
      data: {
        firstName: updateUserDTO.firstName,
        lastName: updateUserDTO.lastName,
        email: updateUserDTO.email,
        password: updateUserDTO.password,
      },
    });

    return updatedUser;
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

    if (!databaseEmail) {
      throw new Error("Email already exists.");
    }

    return !!databaseEmail;
  }
}

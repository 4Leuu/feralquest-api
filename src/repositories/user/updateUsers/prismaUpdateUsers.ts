import { PrismaClient } from "@prisma/client";
import { User } from "../../../models/user";
import { UpdateUserDTO } from "../../../dtos/users";
import { IUpdateUsersRepository } from "../../../controllers/user/updateUsers/protocols";
import bcrypt from "bcrypt";

export class PrismaUpdateUsersRepository implements IUpdateUsersRepository {
  constructor(private readonly prisma: PrismaClient) {}

  async updateUsers(updateUserDTO: UpdateUserDTO): Promise<User> {
    if (updateUserDTO.email) {
      await this.emailExistsOnDatabase(updateUserDTO.email);
    }

    if (updateUserDTO.password) {
      updateUserDTO.password = await this.hashPassword(updateUserDTO.password);
    }

    const updatedUser = await this.prisma.user.update({
      where: {
        id: updateUserDTO.id,
      },
      data: {
        ...(updateUserDTO.firstName && { firstName: updateUserDTO.firstName }),
        ...(updateUserDTO.lastName && { lastName: updateUserDTO.lastName }),
        ...(updateUserDTO.email && { email: updateUserDTO.email }),
        ...(updateUserDTO.password && { password: updateUserDTO.password }),
      },
    });

    return updatedUser;
  }

  private async hashPassword(password: string): Promise<string> {
    const hashedPassword = await bcrypt.hash(password, 10);
    return hashedPassword;
  }

  private async emailExistsOnDatabase(email: string): Promise<void> {
    const user = await this.prisma.user.findUnique({
      where: {
        email: email,
      },
    });

    if (!user) {
      throw new Error("Email already exists.");
    }
  }
}

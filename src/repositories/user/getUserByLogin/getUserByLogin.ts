import { PrismaClient, User } from "@prisma/client";
import { getUserByLoginRepository } from "../../../controllers/user/getUserByLogin/protocols";
import { SearchByloginDTO } from "../../../dtos/users";
import bcrypt from "bcrypt";

export class GetUserByLoginPrisma implements getUserByLoginRepository {
  constructor(private readonly prisma: PrismaClient) {}
  async getUserByLogin(searchByLoginDTO: SearchByloginDTO): Promise<User> {
    const user = await this.prisma.user.findFirst({
      where: {
        email: searchByLoginDTO.email,
      },
    });

    if (!user) throw new Error("Invalid email or password");

    const isPasswordValid = await bcrypt.compare(
      searchByLoginDTO.password,
      user.password
    );

    if (!isPasswordValid) throw new Error("Invalid email or password");

    return user;
  }
}

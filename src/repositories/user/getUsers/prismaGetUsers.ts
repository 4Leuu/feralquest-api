import { PrismaClient } from "@prisma/client";
import { IGetUsersRepository } from "../../../controllers/user/getUsers/protocols";
import { User } from "../../../models/user";

export class PrismaGetUsersRepository implements IGetUsersRepository {
  constructor(private readonly prisma: PrismaClient) {}

  async getUsers(): Promise<User[]> {
    const users = await this.prisma.user.findMany();
    return users;
  }
}

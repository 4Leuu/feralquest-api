import { PrismaClient } from "@prisma/client";
import { IGetUsersByIdRepository } from "../../controllers/getUsersById/protocols";
import { User } from "../../models/user";

export class PrismaGetUsersByIdRepository implements IGetUsersByIdRepository {
  constructor(private readonly prisma: PrismaClient) {}

  async getUsersById(id: string): Promise<User> {
    const user = await this.prisma.user.findUnique({
      where: { id: id },
    });

    if (!user) throw new Error("User not found."); // Se não encontrar, lance um erro

    return user;
  }
}

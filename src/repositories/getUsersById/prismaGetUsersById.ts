import { PrismaClient } from "@prisma/client";
import { IGetUsersByIdRepository } from "../../controllers/user/getUsersById/protocols";
import { User } from "../../models/user";
import { SearchByIdDTO } from "../../dtos/users";

export class PrismaGetUsersByIdRepository implements IGetUsersByIdRepository {
  constructor(private readonly prisma: PrismaClient) {}

  async getUsersById(searchByIdDTO: SearchByIdDTO): Promise<User> {
    const user = await this.prisma.user.findUnique({
      where: { id: searchByIdDTO.id },
    });

    if (!user) throw new Error("User not found.");

    return user;
  }
}

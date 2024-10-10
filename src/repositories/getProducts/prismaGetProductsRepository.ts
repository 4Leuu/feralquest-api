import { PrismaClient } from "@prisma/client";
import { IGetProductsRepository } from "../../controllers/product/getProducts/protocols";
import { Products } from "../../models/products";

export class PrismaGetProductsRepository implements IGetProductsRepository {
  constructor(private readonly prisma: PrismaClient) {}
  async getProducts(): Promise<Products[]> {
    return await this.prisma.product.findMany({
      include: {
        sizes: true,
        typeProduct: true,
      },
    });
  }
}

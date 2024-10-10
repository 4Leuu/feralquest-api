import { PrismaClient } from "@prisma/client";
import { IGetProductByIdRepository } from "../../../controllers/product/getProductById/protocols";
import { SearchByIdDTO } from "../../../dtos/products";
import { Products } from "../../../models/products";

export class PrismaGetProductsById implements IGetProductByIdRepository {
  constructor(private readonly prisma: PrismaClient) {}
  async getProductById(searchByIdDTO: SearchByIdDTO): Promise<Products> {
    const product = await this.prisma.product.findFirst({
      where: {
        id: searchByIdDTO.id,
      },
      include: {
        sizes: true,
        typeProduct: true,
      },
    });

    if (!product) throw new Error("Product not found");

    return product;
  }
}

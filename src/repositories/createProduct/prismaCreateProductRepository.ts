import { PrismaClient } from "@prisma/client";
import { ICreateProductsRepository } from "../../controllers/createProduct/protocols";
import { CreateProductDTO } from "../../dtos/products";
import { Products } from "../../models/products";

export class PrismaCreateProducts implements ICreateProductsRepository {
  constructor(private readonly prisma: PrismaClient) {}

  async createProducts(createProductDTO: CreateProductDTO): Promise<Products> {
    const totalQuantity = createProductDTO.sizes.reduce(
      (acc, size) => acc + size.quantity,
      0
    );

    return await this.prisma.product.create({
      data: {
        name: createProductDTO.name,
        fabric: createProductDTO.fabric,
        sizes: {
          create: createProductDTO.sizes.map((size) => ({
            size: size.size,
            quantity: size.quantity,
          })),
        },
        totalQuantity: totalQuantity,
        description: createProductDTO.description,
        price: createProductDTO.price,
        typeProduct: {
          create: {
            type: createProductDTO.typeProduct.type,
          },
        },
      },
      include: {
        sizes: true,
        typeProduct: true,
      },
    });
  }
}

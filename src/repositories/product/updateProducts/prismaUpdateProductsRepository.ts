import { PrismaClient } from "@prisma/client";
import { IUpdateProductsRepository } from "../../../controllers/product/updateProducts/protocols";
import { UpdateProductDTO } from "../../../dtos/products";
import { Products } from "../../../models/products";

export class PrismaUpdateProductsRepository
  implements IUpdateProductsRepository
{
  constructor(private readonly prisma: PrismaClient) {}

  async updateProduct(updateProductDTO: UpdateProductDTO): Promise<Products> {
    const totalQuantity = updateProductDTO.sizes
      ? updateProductDTO.sizes.reduce(
          (acc, size) => acc + (size.quantity || 0),
          0
        )
      : undefined;

    const updatedProduct = await this.prisma.product.update({
      where: {
        id: updateProductDTO.id,
      },
      data: {
        name: updateProductDTO.name ?? undefined,
        fabric: updateProductDTO.fabric ?? undefined,
        description: updateProductDTO.description ?? undefined,
        price: updateProductDTO.price ?? undefined,
        totalQuantity: totalQuantity ?? undefined,

        typeProduct: updateProductDTO.typeProduct
          ? {
              update: {
                type: updateProductDTO.typeProduct.type,
              },
            }
          : undefined,

        sizes: updateProductDTO.sizes
          ? {
              upsert: updateProductDTO.sizes.map((size) => ({
                where: {
                  size_productId: {
                    size: size.size!,
                    productId: updateProductDTO.id,
                  },
                },
                update: {
                  quantity: size.quantity!,
                },
                create: {
                  size: size.size!,
                  quantity: size.quantity!,
                },
              })),
            }
          : undefined,
      },
      include: {
        sizes: true,
        typeProduct: true,
      },
    });

    return updatedProduct;
  }
}

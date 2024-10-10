import { Products } from "../../../models/products";
import { PrismaGetProductsRepository } from "../../../repositories/getProducts/prismaGetProductsRepository";
import { HttpResponse } from "../../protocols";
import { IGetProductsController } from "./protocols";

export class GetProductsController implements IGetProductsController {
  constructor(
    private readonly getProductsRepository: PrismaGetProductsRepository
  ) {}
  async handle(): Promise<HttpResponse<Products[]>> {
    try {
      const product = await this.getProductsRepository.getProducts();

      return {
        statusCode: 200,
        body: product,
      };
    } catch (error) {
      return {
        statusCode: 500,
        body: "Somethings went wrong. " + error,
      };
    }
  }
}

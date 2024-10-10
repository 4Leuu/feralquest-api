import { UpdateProductDTO } from "../../dtos/products";
import { Products } from "../../models/products";
import { PrismaUpdateProductsRepository } from "../../repositories/updateProducts/prismaUpdateProductsRepository";
import { HttpRequest, HttpResponse } from "../protocols";
import { IUpdateProductsController } from "./protocols";

export class UpdateProductsController implements IUpdateProductsController {
  constructor(
    private readonly updateProductsRepository: PrismaUpdateProductsRepository
  ) {}

  async handle(
    httpRequest: HttpRequest<UpdateProductDTO, void, void>
  ): Promise<HttpResponse<Products>> {
    try {
      if (!httpRequest.body) {
        return {
          statusCode: 400,
          body: "Please specify a body.",
        };
      }

      const product = await this.updateProductsRepository.updateProduct(
        httpRequest.body
      );

      return {
        statusCode: 200,
        body: product,
      };
    } catch (error) {
      return {
        statusCode: 500,
        body: "Something went wrong. " + error,
      };
    }
  }
}

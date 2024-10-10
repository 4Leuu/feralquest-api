import { CreateProductDTO } from "../../../dtos/products";
import { Products } from "../../../models/products";
import { PrismaCreateProducts } from "../../../repositories/product/createProduct/prismaCreateProductRepository";
import { HttpRequest, HttpResponse } from "../../protocols";
import { ICreateProductsController } from "./protocols";

export class CreateProductController implements ICreateProductsController {
  constructor(
    private readonly createProductsRepository: PrismaCreateProducts
  ) {}

  async handle(
    httpRequest: HttpRequest<CreateProductDTO, void, void>
  ): Promise<HttpResponse<Products>> {
    try {
      if (!httpRequest.body) {
        return {
          statusCode: 400,
          body: "Please specify a body.",
        };
      }

      const product = await this.createProductsRepository.createProducts(
        httpRequest.body
      );

      return {
        statusCode: 201,
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

import { SearchByIdDTO } from "../../../dtos/products";
import { Products } from "../../../models/products";
import { PrismaGetProductsById } from "../../../repositories/getProductsById/prismaGetProductsById";
import { HttpRequest, HttpResponse } from "../../protocols";
import { IGetProductByIdController } from "./protocols";

export class GetProductsByIdController implements IGetProductByIdController {
  constructor(private readonly getProductsById: PrismaGetProductsById) {}

  async handle(
    httpRequest: HttpRequest<void, void, SearchByIdDTO>
  ): Promise<HttpResponse<Products>> {
    try {
      if (!httpRequest.params) {
        return {
          statusCode: 400,
          body: "Please specify a params.",
        };
      }

      const product = await this.getProductsById.getProductById(
        httpRequest.params
      );

      return {
        statusCode: 200,
        body: product,
      };
    } catch (error) {
      return {
        statusCode: 404,
        body: "Something went wrong. " + error,
      };
    }
  }
}

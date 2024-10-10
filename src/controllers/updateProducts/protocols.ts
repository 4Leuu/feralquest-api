import { UpdateProductDTO } from "../../dtos/products";
import { Products } from "../../models/products";
import { HttpRequest, HttpResponse } from "../protocols";

export interface IUpdateProductsController {
  handle(
    httpRequest: HttpRequest<UpdateProductDTO, void, void>
  ): Promise<HttpResponse<Products>>;
}

export interface IUpdateProductsRepository {
  updateProduct(updateProductDTO: UpdateProductDTO): Promise<Products>;
}

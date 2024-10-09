import { CreateProductDTO } from "../../dtos/products";
import { Products } from "../../models/products";
import { HttpRequest, HttpResponse } from "../protocols";

export interface ICreateProductsController {
  handle(
    httpRequest: HttpRequest<CreateProductDTO, void, void>
  ): Promise<HttpResponse<Products>>;
}

export interface ICreateProductsRepository {
  createProducts(createProductDTO: CreateProductDTO): Promise<Products>;
}

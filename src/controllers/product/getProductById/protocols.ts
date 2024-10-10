import { SearchByIdDTO } from "../../../dtos/products";
import { Products } from "../../../models/products";
import { HttpRequest, HttpResponse } from "../../protocols";

export interface IGetProductByIdController {
  handle(
    httpRequest: HttpRequest<void, void, SearchByIdDTO>
  ): Promise<HttpResponse<Products>>;
}

export interface IGetProductByIdRepository {
  getProductById(searchByIdDTO: SearchByIdDTO): Promise<Products>;
}

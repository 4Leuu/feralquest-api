import { Products } from "../../models/products";
import { HttpResponse } from "../protocols";

export interface IGetProductsController {
  handle(): Promise<HttpResponse<Products[]>>;
}

export interface IGetProductsRepository {
  getProducts(): Promise<Products[]>;
}

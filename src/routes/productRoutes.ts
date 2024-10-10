import express from "express";
import { PrismaClient } from "@prisma/client";
import { PrismaCreateProducts } from "../repositories/product/createProduct/prismaCreateProductRepository";
import { CreateProductController } from "../controllers/product/createProduct/createProducts";
import { PrismaGetProductsRepository } from "../repositories/product/getProducts/prismaGetProductsRepository";
import { GetProductsController } from "../controllers/product/getProducts/getProducts";
import { UpdateProductsController } from "../controllers/product/updateProducts/updateProducts";
import { GetProductsByIdController } from "../controllers/product/getProductById/getProductById";
import { PrismaGetProductsById } from "../repositories/product/getProductsById/prismaGetProductsById";
import { PrismaUpdateProductsRepository } from "../repositories/product/updateProducts/prismaUpdateProductsRepository";

export const productRouter = express();

const prisma = new PrismaClient();

productRouter.post("/createProduct", async (req, res) => {
  const prismaCreateProduct = new PrismaCreateProducts(prisma);
  const createProductsController = new CreateProductController(
    prismaCreateProduct
  );
  const { body, statusCode } = await createProductsController.handle({
    body: req.body,
  });

  res.status(statusCode).send(body);
});

productRouter.get("/getProducts", async (req, res) => {
  const prismaGetProducts = new PrismaGetProductsRepository(prisma);
  const getProductsController = new GetProductsController(prismaGetProducts);
  const { body, statusCode } = await getProductsController.handle();

  res.status(statusCode).send(body);
});

productRouter.put("/updateProducts", async (req, res) => {
  const prismaUpdateProductsRepository = new PrismaUpdateProductsRepository(
    prisma
  );
  const updateProductsController = new UpdateProductsController(
    prismaUpdateProductsRepository
  );
  const { body, statusCode } = await updateProductsController.handle({
    body: req.body,
  });

  res.status(statusCode).send(body);
});

productRouter.get("/getProductsById/:id", async (req, res) => {
  const getProductByIdRepository = new PrismaGetProductsById(prisma);
  const controller = new GetProductsByIdController(getProductByIdRepository);
  const { body, statusCode } = await controller.handle({
    params: req.params,
  });

  res.status(statusCode).send(body);
});

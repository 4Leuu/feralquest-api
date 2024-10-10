import express from "express";
import { PrismaClient } from "@prisma/client";
import { PrismaCreateProducts } from "../repositories/createProduct/prismaCreateProductRepository";
import { CreateProductController } from "../controllers/createProduct/createProducts";
import { PrismaGetProductsRepository } from "../repositories/getProducts/prismaGetProductsRepository";
import { GetProductsController } from "../controllers/getProducts/getProducts";

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

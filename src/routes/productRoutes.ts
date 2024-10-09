import express from "express";
import { PrismaClient } from "@prisma/client";
import { PrismaCreateProducts } from "../repositories/createProduct/prismaCreateProductRepository";
import { CreateProductController } from "../controllers/createProduct/createProducts";

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

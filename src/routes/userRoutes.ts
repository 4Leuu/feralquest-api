import { PrismaClient } from "@prisma/client";
import express from "express";
import { PrismaGetUsersRepository } from "../repositories/getUsers/prismaGetUsers";
import { GetUsersController } from "../controllers/getUsers/getUsers";
import { PrismaCreateUsers } from "../repositories/createUsers/prismaCreateUsers";
import { CreateUserController } from "../controllers/createUsers/createUsers";
import { PrismaUpdateUsersRepository } from "../repositories/updateUsers/prismaUpdateUsers";
import { UpdateUserController } from "../controllers/updateUsers/updateUser";

export const userRouter = express();

const prisma = new PrismaClient();

userRouter.get("/getUsers", async (req, res) => {
  const prismaGetUsersRepository = new PrismaGetUsersRepository(prisma);
  const getUsersController = new GetUsersController(prismaGetUsersRepository);
  const { body, statusCode } = await getUsersController.handle();

  res.send(body).status(statusCode);
});

userRouter.post("/createUsers", async (req, res) => {
  const prismaCreateUsers = new PrismaCreateUsers(prisma);
  const createUsersController = new CreateUserController(prismaCreateUsers);
  const { body, statusCode } = await createUsersController.handle({
    body: req.body,
  });

  res.send(body).status(statusCode);
});

userRouter.put("/updateUsers", async (req, res) => {
  const prismaUpdateUsers = new PrismaUpdateUsersRepository(prisma);
  const updateUsersController = new UpdateUserController(prismaUpdateUsers);
  const { body, statusCode } = await updateUsersController.handle({
    body: req.body,
  });

  res.send(body).status(statusCode);
});

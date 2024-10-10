import express from "express";
import { PrismaClient } from "@prisma/client";
import { PrismaGetUsersRepository } from "../repositories/getUsers/prismaGetUsers";
import { GetUsersController } from "../controllers/user/getUsers/getUsers";
import { PrismaCreateUsers } from "../repositories/createUsers/prismaCreateUsers";
import { CreateUserController } from "../controllers/user/createUsers/createUsers";
import { PrismaUpdateUsersRepository } from "../repositories/updateUsers/prismaUpdateUsers";
import { UpdateUserController } from "../controllers/user/updateUsers/updateUser";
import { PrismaGetUsersByIdRepository } from "../repositories/getUsersById/prismaGetUsersById";
import { GetUsersByIdController } from "../controllers/user/getUsersById/getUsersById";

export const userRouter = express();

const prisma = new PrismaClient();

userRouter.get("/getUsers", async (req, res) => {
  const prismaGetUsers = new PrismaGetUsersRepository(prisma);
  const getUsersController = new GetUsersController(prismaGetUsers);
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

userRouter.get("/getUserById/:id", async (req, res) => {
  const prismaGetUsersById = new PrismaGetUsersByIdRepository(prisma);
  const getUsersByIdController = new GetUsersByIdController(prismaGetUsersById);
  const { body, statusCode } = await getUsersByIdController.handle({
    params: req.params,
  });

  res.send(body).status(statusCode);
});

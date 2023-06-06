import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

async function getUsers(req: Request, res: Response) {
  const users = await prisma.users.findMany({
    select: {
      id: true,
      username: true,
      email: true,
    },
  });

  if (!users) {
    return res.status(404).json({ message: "Users not found" });
  }

  return res.status(200).json(users);
}

async function getUser(req: Request, res: Response) {
  const user = await prisma.users.findUnique({
    where: {
      id: parseInt(req.params.id),
    },
    select: {
      id: true,
      username: true,
      email: true,
    },
  });

  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }

  return res.status(200).json(user);
}

async function createUser(req: Request, res: Response) {
  const { username, email, password } = req.body;
  await prisma.users.create({
    data: {
      username,
      email,
      password,
    },
  });

  res.sendStatus(201);
}

async function updateUser(req: Request, res: Response) {
  const { username, email, password } = req.body;
  const { id } = req.params;

  await prisma.users.update({
    where: {
      id: parseInt(id),
    },
    data: {
      username,
      email,
      password,
    },
  });

  res.send(204);
}

async function deleteUser(req: Request, res: Response) {
  const { id } = req.params;

  await prisma.users.delete({
    where: {
      id: parseInt(id),
    },
  });

  res.sendStatus(204);
}

const usersController = {
  getUsers,
  getUser,
  createUser,
  updateUser,
  deleteUser,
};

export { usersController };

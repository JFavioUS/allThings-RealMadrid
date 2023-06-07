import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function getUsers(req: Request, res: Response) {
  try {
    const users = await prisma.users.findMany({
      select: {
        id: true,
        username: true,
        email: true,
      },
    });

    if (!users.length) {
      return res.status(204).json({ message: "No content in user's endpoint" });
    }

    res.status(200).json(users);
  } catch (error) {
    throw new Error(error);
  }
}

async function getUser(req: Request, res: Response) {
  const { id } = req.params;

  try {
    const user = await prisma.users.findUnique({
      where: { id: parseInt(id) },
      select: {
        id: true,
        username: true,
        email: true,
      },
    });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json(user);
  } catch (error) {
    throw new Error(error);
  }
}

async function createUser(req: Request, res: Response) {
  const { userData } = req.body;

  try {
    await prisma.users.create({
      data: userData,
    });

    res.status(201);
  } catch (error) {
    throw new Error(error);
  }
}

async function updateUser(req: Request, res: Response) {
  const { id } = req.params;
  const { userData } = req.body;

  try {
    const updatedUser = await prisma.users.update({
      where: { id: parseInt(id) },
      data: userData,
    });

    if (!updatedUser) {
      return res.status(404).json({ message: "No user found" });
    }

    res.status(200);
  } catch (error) {
    throw new Error(error);
  }
}

async function deleteUser(req: Request, res: Response) {
  const { id } = req.params;

  try {
    const deletedUser = await prisma.users.delete({
      where: { id: parseInt(id) },
    });

    if (!deletedUser) {
      return res.status(404).json({ message: "No user found" });
    }

    res.status(200);
  } catch (error) {
    throw new Error(error);
  }
}

export const usersController = {
  getUsers,
  getUser,
  createUser,
  updateUser,
  deleteUser,
};

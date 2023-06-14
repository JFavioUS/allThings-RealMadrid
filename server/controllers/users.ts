import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

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
    res.status(500).json({ message: "An error occurred", error });
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
    res.status(500).json({ message: "An error occurred", error });
  }
}

async function createUser(req: Request, res: Response) {
  const { email, password, username } = req.body;

  const hashedPassword = await bcrypt.hash(password, 10);

  const data = {
    email,
    password: hashedPassword,
    username,
  };
  try {
    await prisma.users.create({
      data,
    });

    return res.status(201);
  } catch (error) {
    res.status(500).json({ message: "An error occurred", error });
  }
}

async function updateUser(req: Request, res: Response) {
  const { id } = req.params;
  const { email, password, username } = req.body;
  const hashedPassword = await bcrypt.hash(password, 10);

  const data = {
    email,
    password: hashedPassword,
    username,
  };
  try {
    const updatedUser = await prisma.users.update({
      where: { id: parseInt(id) },
      data,
    });

    if (!updatedUser) {
      return res.status(404).json({ message: "No user found" });
    }

    res.status(200);
  } catch (error) {
    res.status(500).json({ message: "An error occurred", error });
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
    res.status(500).json({ message: "An error occurred", error });
  }
}

export const usersController = {
  getUsers,
  getUser,
  createUser,
  updateUser,
  deleteUser,
};

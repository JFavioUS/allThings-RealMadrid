import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const prisma = new PrismaClient();

async function authenticate(req: Request, res: Response) {
  const { username, password } = req.body;

  const users = await prisma.users.findMany({
    where: {
      username,
    },
  });

  const user = users && users.length > 0 && users[0];
  if (user) {
    const passwordCorrect = await bcrypt.compare(password, user.password);
    if (passwordCorrect) {
      const accessToken = jwt.sign(
        {
          sub: user.id,
        },
        "MySecret",
        { expiresIn: "1h" }
      );

      res.status(200).json({ accessToken });
    } else {
      res.status(401).json({ message: "Invalid username or password" });
    }
  }

  res.status(401).json({ message: "Invalid username or password" });
}

export const authenticationController = {
  authenticate,
};

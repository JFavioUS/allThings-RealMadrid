import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function getStadiums(req: Request, res: Response) {
  const stadiums = await prisma.stadiums.findMany();
  res.json(stadiums);
}

async function getStadium(req: Request, res: Response) {
  const { id } = req.params;
  const stadium = await prisma.stadiums.findUnique({
    where: { id: parseInt(id) },
  });
  res.json(stadium);
}

async function createStadium(req: Request, res: Response) {
  const stadiumData = req.body;
  const newStadium = await prisma.stadiums.create({ data: stadiumData });
  res.json(newStadium);
}

async function updateStadium(req: Request, res: Response) {
  const { id } = req.params;
  const updates = req.body;
  const updatedStadium = await prisma.stadiums.update({
    where: { id: parseInt(id) },
    data: updates,
  });
  res.json(updatedStadium);
}

async function deleteStadium(req: Request, res: Response) {
  const { id } = req.params;
  const deletedStadium = await prisma.stadiums.delete({
    where: { id: parseInt(id) },
  });
  res.json(deletedStadium);
}

export const stadiumsController = {
  getStadiums,
  getStadium,
  createStadium,
  updateStadium,
  deleteStadium,
};

import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function getMatches(req: Request, res: Response) {
  const matches = await prisma.matches.findMany();
  res.json(matches);
}

async function getMatch(req: Request, res: Response) {
  const { id } = req.params;
  const match = await prisma.matches.findUnique({
    where: { id: parseInt(id) },
  });
  res.json(match);
}

async function createMatch(req: Request, res: Response) {
  const matchData = req.body;
  const newMatch = await prisma.matches.create({ data: matchData });
  res.json(newMatch);
}

async function updateMatch(req: Request, res: Response) {
  const { id } = req.params;
  const updates = req.body;
  const updatedMatch = await prisma.matches.update({
    where: { id: parseInt(id) },
    data: updates,
  });
  res.json(updatedMatch);
}

async function deleteMatch(req: Request, res: Response) {
  const { id } = req.params;
  const deletedMatch = await prisma.matches.delete({
    where: { id: parseInt(id) },
  });
  res.json(deletedMatch);
}

export const matchesController = {
  getMatches,
  getMatch,
  createMatch,
  updateMatch,
  deleteMatch,
};

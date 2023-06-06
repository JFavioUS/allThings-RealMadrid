import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function getCompetitions(req: Request, res: Response) {
  const competitions = await prisma.competitions.findMany();
  res.json(competitions);
}

async function getCompetition(req: Request, res: Response) {
  const { id } = req.params;
  const competition = await prisma.competitions.findUnique({
    where: { id: parseInt(id) },
  });
  res.json(competition);
}

async function createCompetition(req: Request, res: Response) {
  const competitionData = req.body;
  const newCompetition = await prisma.competitions.create({
    data: competitionData,
  });
  res.json(newCompetition);
}

async function updateCompetition(req: Request, res: Response) {
  const { id } = req.params;
  const updates = req.body;
  const updatedCompetition = await prisma.competitions.update({
    where: { id: parseInt(id) },
    data: updates,
  });
  res.json(updatedCompetition);
}

async function deleteCompetition(req: Request, res: Response) {
  const { id } = req.params;
  const deletedCompetition = await prisma.competitions.delete({
    where: { id: parseInt(id) },
  });
  res.json(deletedCompetition);
}

export const competitionsController = {
  getCompetitions,
  getCompetition,
  createCompetition,
  updateCompetition,
  deleteCompetition,
};

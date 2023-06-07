import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function getCompetitions(req: Request, res: Response) {
  try {
    const competitions = await prisma.competitions.findMany();

    if (!competitions.length) {
      return res.status(204).json({ message: "No content" });
    }

    res.status(200).json(competitions);
  } catch (error) {
    throw new Error(error);
  }
}

async function getCompetition(req: Request, res: Response) {
  const { id } = req.params;

  try {
    const competition = await prisma.competitions.findUnique({
      where: { id: parseInt(id) },
    });

    if (!competition) {
      return res.status(404).json({ message: "No competition found" });
    }

    res.status(200).json(competition);
  } catch (error) {
    throw new Error(error);
  }
}

async function createCompetition(req: Request, res: Response) {
  const { competitionData } = req.body;

  try {
    const newCompetition = await prisma.competitions.create({
      data: competitionData,
    });

    res.status(201).json(newCompetition);
  } catch (error) {
    throw new Error(error);
  }
}

async function updateCompetition(req: Request, res: Response) {
  const { id } = req.params;
  const { matchData } = req.body;

  try {
    const updatedCompetition = await prisma.competitions.update({
      where: { id: parseInt(id) },
      data: matchData,
    });

    if (!updatedCompetition) {
      return res.status(404).json({ message: "No competition found" });
    }

    res.status(200).json(updatedCompetition);
  } catch (error) {
    throw new Error(error);
  }
}

async function deleteCompetition(req: Request, res: Response) {
  const { id } = req.params;

  try {
    const deletedCompetition = await prisma.competitions.delete({
      where: { id: parseInt(id) },
    });

    if (!deletedCompetition) {
      return res.status(404).json({ message: "No competition found" });
    }

    res.status(200).json(deletedCompetition);
  } catch (error) {
    throw new Error(error);
  }
}

export const competitionsController = {
  getCompetitions,
  getCompetition,
  createCompetition,
  updateCompetition,
  deleteCompetition,
};

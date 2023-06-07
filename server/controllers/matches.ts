import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function getMatches(req: Request, res: Response) {
  try {
    const matches = await prisma.matches.findMany();

    if (!matches.length) {
      return res.status(204).json({ message: "No content" });
    }

    res.status(200).json(matches);
  } catch (error) {
    throw new Error(error);
  }
}

async function getMatch(req: Request, res: Response) {
  const { id } = req.params;

  try {
    const match = await prisma.matches.findUnique({
      where: { id: parseInt(id) },
    });

    if (!match) {
      return res.status(404).json({ message: "No match found" });
    }

    res.status(200).json(match);
  } catch (error) {
    throw new Error(error);
  }
}

async function createMatch(req: Request, res: Response) {
  const { matchData } = req.body;

  try {
    const newMatch = await prisma.matches.create({
      data: matchData,
    });

    res.status(201).json(newMatch);
  } catch (error) {
    throw new Error(error);
  }
}

async function updateMatch(req: Request, res: Response) {
  const { id } = req.params;
  const { matchData } = req.body;

  try {
    const updatedMatch = await prisma.matches.update({
      where: { id: parseInt(id) },
      data: matchData,
    });

    if (!updatedMatch) {
      return res.status(404).json({ message: "No match found" });
    }

    res.status(200).json(updatedMatch);
  } catch (error) {
    throw new Error(error);
  }
}

async function deleteMatch(req: Request, res: Response) {
  const { id } = req.params;

  try {
    const deletedMatch = await prisma.matches.delete({
      where: { id: parseInt(id) },
    });

    if (!deletedMatch) {
      return res.status(404).json({ message: "No match found" });
    }

    res.status(200).json(deletedMatch);
  } catch (error) {
    throw new Error(error);
  }
}

export const matchesController = {
  getMatches,
  getMatch,
  createMatch,
  updateMatch,
  deleteMatch,
};

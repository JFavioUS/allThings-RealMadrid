import { Request, Response } from "express";
import prisma from "../utils/prisma";

async function getStadiums(req: Request, res: Response) {
  try {
    const stadiums = await prisma.stadiums.findMany();

    if (!stadiums.length) {
      return res.status(204).json({ message: "No content" });
    }

    res.status(200).json(stadiums);
  } catch (error) {
    res.status(500).json({ message: "An error occurred", error });
  }
}

async function getStadium(req: Request, res: Response) {
  const { id } = req.params;

  try {
    const stadium = await prisma.stadiums.findUnique({
      where: { id: parseInt(id) },
    });

    if (!stadium) {
      return res.status(404).json({ message: "No stadium found" });
    }

    res.status(200).json(stadium);
  } catch (error) {
    res.status(500).json({ message: "An error occurred", error });
  }
}

async function createStadium(req: Request, res: Response) {
  const { stadiumData } = req.body;

  if (!stadiumData) {
    return res.status(400).json({ message: "stadiumData is required" });
  }

  try {
    const newStadium = await prisma.stadiums.create({
      data: stadiumData,
    });

    res.status(201).json(newStadium);
  } catch (error) {
    res.status(500).json({ message: "An error occurred", error });
  }
}

async function updateStadium(req: Request, res: Response) {
  const { id } = req.params;
  const { matchData } = req.body;

  if (!matchData) {
    return res.status(400).json({ message: "matchData is required" });
  }

  try {
    const updatedStadium = await prisma.stadiums.update({
      where: { id: parseInt(id) },
      data: matchData,
    });

    if (!updatedStadium) {
      return res.status(404).json({ message: "No stadium found" });
    }

    res.status(200).json(updatedStadium);
  } catch (error) {
    res.status(500).json({ message: "An error occurred", error });
  }
}

async function deleteStadium(req: Request, res: Response) {
  const { id } = req.params;

  try {
    const deletedStadium = await prisma.stadiums.delete({
      where: { id: parseInt(id) },
    });

    if (!deletedStadium) {
      return res.status(404).json({ message: "No stadium found" });
    }

    res.status(200).json(deletedStadium);
  } catch (error) {
    res.status(500).json({ message: "An error occurred", error });
  }
}

export const stadiumsController = {
  getStadiums,
  getStadium,
  createStadium,
  updateStadium,
  deleteStadium,
};

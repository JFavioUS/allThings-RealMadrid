import { Request, Response } from "express";
import prisma from "../utils/prisma";

async function getPredictions(req: Request, res: Response) {
  try {
    const predictions = await prisma.predictions.findMany();

    if (!predictions.length) {
      return res.status(204).json({ message: "No content" });
    }

    res.status(200).json(predictions);
  } catch (error) {
    res.status(500).json({ message: "An error occurred", error });
  }
}

async function getPrediction(req: Request, res: Response) {
  const { id } = req.params;

  try {
    const prediction = await prisma.predictions.findUnique({
      where: { id: parseInt(id) },
    });

    if (!prediction) {
      return res.status(404).json({ message: "No prediction found" });
    }

    res.status(200).json(prediction);
  } catch (error) {
    res.status(500).json({ message: "An error occurred", error });
  }
}

async function createPrediction(req: Request, res: Response) {
  const { predictionData } = req.body;

  if (!predictionData) {
    return res.status(400).json({ message: "predictionData is required" });
  }

  try {
    const newPrediction = await prisma.predictions.create({
      data: predictionData,
    });

    res.status(201).json(newPrediction);
  } catch (error) {
    res.status(500).json({ message: "An error occurred", error });
  }
}

async function updatePrediction(req: Request, res: Response) {
  const { id } = req.params;
  const { matchData } = req.body;

  if (!matchData) {
    return res.status(400).json({ message: "matchData is required" });
  }

  try {
    const updatedPrediction = await prisma.predictions.update({
      where: { id: parseInt(id) },
      data: matchData,
    });

    if (!updatedPrediction) {
      return res.status(404).json({ message: "No prediction found" });
    }

    res.status(200).json(updatedPrediction);
  } catch (error) {
    res.status(500).json({ message: "An error occurred", error });
  }
}

async function deletePrediction(req: Request, res: Response) {
  const { id } = req.params;

  try {
    const deletedPrediction = await prisma.predictions.delete({
      where: { id: parseInt(id) },
    });

    if (!deletedPrediction) {
      return res.status(404).json({ message: "No prediction found" });
    }

    res.status(200).json(deletedPrediction);
  } catch (error) {
    res.status(500).json({ message: "An error occurred", error });
  }
}

export const predictionsController = {
  getPredictions,
  getPrediction,
  createPrediction,
  updatePrediction,
  deletePrediction,
};

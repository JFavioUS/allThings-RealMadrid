import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function getPredictions(req: Request, res: Response) {
  try {
    const predictions = await prisma.predictions.findMany();

    if (!predictions.length) {
      return res.status(204).json({ message: "No content" });
    }

    res.status(200).json(predictions);
  } catch (error) {
    throw new Error(error);
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
    throw new Error(error);
  }
}

async function createPrediction(req: Request, res: Response) {
  const { predictionData } = req.body;

  try {
    const newPrediction = await prisma.predictions.create({
      data: predictionData,
    });

    res.status(201).json(newPrediction);
  } catch (error) {
    throw new Error(error);
  }
}

async function updatePrediction(req: Request, res: Response) {
  const { id } = req.params;
  const { predictionData } = req.body;

  try {
    const updatedPrediction = await prisma.predictions.update({
      where: { id: parseInt(id) },
      data: predictionData,
    });

    if (!updatedPrediction) {
      return res.status(404).json({ message: "No prediction found" });
    }

    res.status(200).json(updatedPrediction);
  } catch (error) {
    throw new Error(error);
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
    throw new Error(error);
  }
}

export const predictionsController = {
  getPredictions,
  getPrediction,
  createPrediction,
  updatePrediction,
  deletePrediction,
};

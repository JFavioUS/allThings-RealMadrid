import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function getPredictions(req: Request, res: Response) {
  const predictions = await prisma.predictions.findMany();
  res.json(predictions);
}

async function getPrediction(req: Request, res: Response) {
  const { id } = req.params;
  const prediction = await prisma.predictions.findUnique({
    where: { id: parseInt(id) },
  });
  res.json(prediction);
}

async function createPrediction(req: Request, res: Response) {
  const predictionData = req.body;
  const newPrediction = await prisma.predictions.create({
    data: predictionData,
  });
  res.json(newPrediction);
}

async function updatePrediction(req: Request, res: Response) {
  const { id } = req.params;
  const updates = req.body;
  const updatedPrediction = await prisma.predictions.update({
    where: { id: parseInt(id) },
    data: updates,
  });
  res.json(updatedPrediction);
}

async function deletePrediction(req: Request, res: Response) {
  const { id } = req.params;
  const deletedPrediction = await prisma.predictions.delete({
    where: { id: parseInt(id) },
  });
  res.json(deletedPrediction);
}

export const predictionsController = {
  getPredictions,
  getPrediction,
  createPrediction,
  updatePrediction,
  deletePrediction,
};

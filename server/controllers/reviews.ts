import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function getReviews(req: Request, res: Response) {
  const reviews = await prisma.reviews.findMany();
  res.json(reviews);
}

async function getReview(req: Request, res: Response) {
  const { id } = req.params;
  const review = await prisma.reviews.findUnique({
    where: { id: parseInt(id) },
  });
  res.json(review);
}

async function createReview(req: Request, res: Response) {
  const reviewData = req.body;
  const newReview = await prisma.reviews.create({ data: reviewData });
  res.json(newReview);
}

async function updateReview(req: Request, res: Response) {
  const { id } = req.params;
  const updates = req.body;
  const updatedReview = await prisma.reviews.update({
    where: { id: parseInt(id) },
    data: updates,
  });
  res.json(updatedReview);
}

async function deleteReview(req: Request, res: Response) {
  const { id } = req.params;
  const deletedReview = await prisma.reviews.delete({
    where: { id: parseInt(id) },
  });
  res.json(deletedReview);
}

export const reviewsController = {
  getReviews,
  getReview,
  createReview,
  updateReview,
  deleteReview,
};

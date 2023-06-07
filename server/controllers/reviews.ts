import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function getReviews(req: Request, res: Response) {
  try {
    const reviews = await prisma.reviews.findMany();

    if (!reviews.length) {
      return res.status(204).json({ message: "No content" });
    }

    res.status(200).json(reviews);
  } catch (error) {
    throw new Error(error);
  }
}

async function getReview(req: Request, res: Response) {
  const { id } = req.params;

  try {
    const review = await prisma.reviews.findUnique({
      where: { id: parseInt(id) },
    });

    if (!review) {
      return res.status(404).json({ message: "No review found" });
    }

    res.status(200).json(review);
  } catch (error) {
    throw new Error(error);
  }
}

async function createReview(req: Request, res: Response) {
  const { reviewData } = req.body;

  try {
    const newReview = await prisma.reviews.create({
      data: reviewData,
    });

    res.status(201).json(newReview);
  } catch (error) {
    throw new Error(error);
  }
}

async function updateReview(req: Request, res: Response) {
  const { id } = req.params;
  const { reviewData } = req.body;

  try {
    const updatedReview = await prisma.reviews.update({
      where: { id: parseInt(id) },
      data: reviewData,
    });

    if (!updatedReview) {
      return res.status(404).json({ message: "No review found" });
    }

    res.status(200).json(updatedReview);
  } catch (error) {
    throw new Error(error);
  }
}

async function deleteReview(req: Request, res: Response) {
  const { id } = req.params;

  try {
    const deletedReview = await prisma.reviews.delete({
      where: { id: parseInt(id) },
    });

    if (!deletedReview) {
      return res.status(404).json({ message: "No review found" });
    }

    res.status(200).json(deletedReview);
  } catch (error) {
    throw new Error(error);
  }
}

export const reviewsController = {
  getReviews,
  getReview,
  createReview,
  updateReview,
  deleteReview,
};

import { Request, Response } from "express";
import prisma from "../utils/prisma";

async function getReviews(req: Request, res: Response) {
  try {
    const reviews = await prisma.reviews.findMany();

    if (!reviews.length) {
      return res.status(204).json({ message: "No content" });
    }

    res.status(200).json(reviews);
  } catch (error) {
    res.status(500).json({ message: "An error occurred", error });
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
    res.status(500).json({ message: "An error occurred", error });
  }
}

async function createReview(req: Request, res: Response) {
  const { reviewData } = req.body;

  if (!reviewData) {
    return res.status(400).json({ message: "reviewData is required" });
  }

  try {
    const newReview = await prisma.reviews.create({
      data: reviewData,
    });

    res.status(201).json(newReview);
  } catch (error) {
    res.status(500).json({ message: "An error occurred", error });
  }
}

async function updateReview(req: Request, res: Response) {
  const { id } = req.params;
  const { matchData } = req.body;

  if (!matchData) {
    return res.status(400).json({ message: "matchData is required" });
  }

  try {
    const updatedReview = await prisma.reviews.update({
      where: { id: parseInt(id) },
      data: matchData,
    });

    if (!updatedReview) {
      return res.status(404).json({ message: "No review found" });
    }

    res.status(200).json(updatedReview);
  } catch (error) {
    res.status(500).json({ message: "An error occurred", error });
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
    res.status(500).json({ message: "An error occurred", error });
  }
}

export const reviewsController = {
  getReviews,
  getReview,
  createReview,
  updateReview,
  deleteReview,
};

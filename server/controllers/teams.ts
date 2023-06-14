import { Request, Response } from "express";
import prisma from "../utils/prisma";

async function getTeams(req: Request, res: Response) {
  try {
    const teams = await prisma.teams.findMany();

    if (!teams.length) {
      return res.status(204).json({ message: "No content" });
    }

    res.status(200).json(teams);
  } catch (error) {
    res.status(500).json({ message: "An error occurred", error });
  }
}

async function getTeam(req: Request, res: Response) {
  const { id } = req.params;

  try {
    const team = await prisma.teams.findUnique({
      where: { id: parseInt(id) },
    });

    if (!team) {
      return res.status(404).json({ message: "No team found" });
    }

    res.status(200).json(team);
  } catch (error) {
    res.status(500).json({ message: "An error occurred", error });
  }
}

async function createTeam(req: Request, res: Response) {
  const { teamData } = req.body;

  if (!teamData) {
    return res.status(400).json({ message: "teamData is required" });
  }

  try {
    const newTeam = await prisma.teams.create({
      data: teamData,
    });

    res.status(201).json(newTeam);
  } catch (error) {
    res.status(500).json({ message: "An error occurred", error });
  }
}

async function updateTeam(req: Request, res: Response) {
  const { id } = req.params;
  const { matchData } = req.body;

  if (!matchData) {
    return res.status(400).json({ message: "matchData is required" });
  }

  try {
    const updatedTeam = await prisma.teams.update({
      where: { id: parseInt(id) },
      data: matchData,
    });

    if (!updatedTeam) {
      return res.status(404).json({ message: "No team found" });
    }

    res.status(200).json(updatedTeam);
  } catch (error) {
    res.status(500).json({ message: "An error occurred", error });
  }
}

async function deleteTeam(req: Request, res: Response) {
  const { id } = req.params;

  try {
    const deletedTeam = await prisma.teams.delete({
      where: { id: parseInt(id) },
    });

    if (!deletedTeam) {
      return res.status(404).json({ message: "No team found" });
    }

    res.status(200).json(deletedTeam);
  } catch (error) {
    res.status(500).json({ message: "An error occurred", error });
  }
}

export const teamsController = {
  getTeams,
  getTeam,
  createTeam,
  updateTeam,
  deleteTeam,
};

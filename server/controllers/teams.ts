import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function getTeams(req: Request, res: Response) {
  try {
    const teams = await prisma.teams.findMany();

    if (!teams.length) {
      return res.status(204).json({ message: "No content in team's endpoint" });
    }

    res.status(200).json(teams);
  } catch (error) {
    throw new Error(error);
  }
}

async function getTeam(req: Request, res: Response) {
  const { id } = req.params;

  try {
    const team = await prisma.teams.findUnique({
      where: { id: parseInt(id) },
    });

    if (!team) {
      return res.status(404).json({ message: "Team not found" });
    }

    res.status(200).json(team);
  } catch (error) {
    throw new Error(error);
  }
}

async function createTeam(req: Request, res: Response) {
  const { teamData } = req.body;

  try {
    const newTeam = await prisma.teams.create({
      data: teamData,
    });

    res.status(201).json(newTeam);
  } catch (error) {
    throw new Error(error);
  }
}

async function updateTeam(req: Request, res: Response) {
  const { id } = req.params;
  const { teamData } = req.body;

  try {
    const updatedTeam = await prisma.teams.update({
      where: { id: parseInt(id) },
      data: teamData,
    });

    if (!updatedTeam) {
      return res.status(404).json({ message: "No team found" });
    }

    res.status(200).json(updatedTeam);
  } catch (error) {
    throw new Error(error);
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
    throw new Error(error);
  }
}

export const teamsController = {
  getTeams,
  getTeam,
  createTeam,
  updateTeam,
  deleteTeam,
};

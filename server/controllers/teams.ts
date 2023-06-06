import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function getTeams(req: Request, res: Response) {
  const teams = await prisma.teams.findMany();
  res.json(teams);
}

async function getTeam(req: Request, res: Response) {
  const { id } = req.params;
  const team = await prisma.teams.findUnique({ where: { id: parseInt(id) } });
  res.json(team);
}

async function createTeam(req: Request, res: Response) {
  const teamData = req.body;
  const newTeam = await prisma.teams.create({ data: teamData });
  res.json(newTeam);
}

async function updateTeam(req: Request, res: Response) {
  const { id } = req.params;
  const updates = req.body;
  const updatedTeam = await prisma.teams.update({
    where: { id: parseInt(id) },
    data: updates,
  });
  res.json(updatedTeam);
}

async function deleteTeam(req: Request, res: Response) {
  const { id } = req.params;
  const deletedTeam = await prisma.teams.delete({
    where: { id: parseInt(id) },
  });
  res.json(deletedTeam);
}

export const teamsController = {
  getTeams,
  getTeam,
  createTeam,
  updateTeam,
  deleteTeam,
};

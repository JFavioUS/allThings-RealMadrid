// teams.controller.test.ts
import { Request, Response } from "express";
import { teamsController } from "../teams";
import prismaMock from "../../test/__mocks__/prisma";

describe("Teams Controller", () => {
  afterEach(() => {
    jest.clearAllMocks(); // Clear all mocks after each test
  });

  describe("getTeams", () => {
    it("should return teams successfully", async () => {
      const mockData = [
        { id: 1, shortName: "Real Madrid", city: "Madrid", country: "Spain" },
        { id: 2, shortName: "Barcelona", city: "Barcelona", country: "Spain" },
        { id: 3, shortName: "Valencia", city: "Valencia", country: "Spain" },
      ];
      const req = {} as Request;
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      } as unknown as Response;

      const findManyMock = prismaMock.teams.findMany as jest.Mock;
      findManyMock.mockResolvedValue(mockData);

      await teamsController.getTeams(req, res);

      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith(mockData);
      expect(findManyMock).toHaveBeenCalledTimes(1);
    });

    it("should return status 204 if no teams found", async () => {
      const req = {} as Request;
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      } as unknown as Response;

      const findManyMock = prismaMock.teams.findMany as jest.Mock;
      findManyMock.mockResolvedValue([]);

      await teamsController.getTeams(req, res);

      expect(res.status).toHaveBeenCalledWith(204);
      expect(findManyMock).toHaveBeenCalledTimes(1);
    });
  });

  describe("getTeam", () => {
    it("should return team successfully", async () => {
      const mockData = {
        id: 1,
        shortName: "Real Madrid",
        city: "Madrid",
        country: "Spain",
      };
      const req = { params: { id: "1" } } as unknown as Request;
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      } as unknown as Response;

      const findOneMock = prismaMock.teams.findUnique as jest.Mock;
      findOneMock.mockResolvedValue(mockData);

      await teamsController.getTeam(req, res);

      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith(mockData);
      expect(findOneMock).toHaveBeenCalledTimes(1);
    });

    it("should return status 404 if no team found", async () => {
      const req = { params: { id: "1" } } as unknown as Request;
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      } as unknown as Response;

      const findOneMock = prismaMock.teams.findUnique as jest.Mock;
      findOneMock.mockResolvedValue(null);

      await teamsController.getTeam(req, res);

      expect(res.status).toHaveBeenCalledWith(404);
      expect(findOneMock).toHaveBeenCalledTimes(1);
    });
  });

  describe("createTeam", () => {
    it("should create a team successfully", async () => {
      const mockData = {
        shortName: "Real Madrid",
        city: "Madrid",
        country: "Spain",
      };
      const req = {
        body: { teamData: mockData },
      } as Request;
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      } as unknown as Response;

      // Mock the prisma create method
      const createMock = prismaMock.teams.create as jest.Mock;
      createMock.mockResolvedValue(mockData);

      await teamsController.createTeam(req, res);

      expect(res.status).toHaveBeenCalledWith(201);
      expect(res.json).toHaveBeenCalledWith(mockData);
      expect(createMock).toHaveBeenCalledWith({ data: mockData });
    });

    it("should return 400 if teamData is not provided", async () => {
      const req = {
        body: {},
      } as Request;
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      } as unknown as Response;

      await teamsController.createTeam(req, res);

      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith({
        message: "teamData is required",
      });
    });
  });

  describe("updateTeam", () => {
    it("should update a team successfully", async () => {
      const mockData = {
        shortName: "Real Madrid",
        city: "Madrid",
        country: "Spain",
      };
      const req = {
        params: { id: "1" },
        body: { matchData: mockData },
      } as unknown as Request;
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      } as unknown as Response;

      // Mock the prisma update method
      const updateMock = prismaMock.teams.update as jest.Mock;
      updateMock.mockResolvedValue(mockData);

      await teamsController.updateTeam(req, res);

      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith(mockData);
      expect(updateMock).toHaveBeenCalledWith({
        where: { id: 1 },
        data: mockData,
      });
    });

    it("should return 400 if matchData is not provided", async () => {
      const req = {
        params: { id: "1" },
        body: {},
      } as unknown as Request;
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      } as unknown as Response;

      await teamsController.updateTeam(req, res);

      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith({
        message: "matchData is required",
      });
    });
  });

  describe("deleteTeam", () => {
    it("should delete a team successfully", async () => {
      const req = { params: { id: "1" } } as unknown as Request;
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      } as unknown as Response;

      const deleteMock = prismaMock.teams.delete as jest.Mock;
      deleteMock.mockResolvedValue({});

      await teamsController.deleteTeam(req, res);

      expect(res.status).toHaveBeenCalledWith(200);
      expect(deleteMock).toHaveBeenCalledWith({ where: { id: 1 } });
    });

    it("should return 404 if no team found", async () => {
      const req = { params: { id: "1" } } as unknown as Request;
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      } as unknown as Response;

      const deleteMock = prismaMock.teams.delete as jest.Mock;
      deleteMock.mockResolvedValue(null);

      await teamsController.deleteTeam(req, res);

      expect(res.status).toHaveBeenCalledWith(404);
      expect(deleteMock).toHaveBeenCalledWith({ where: { id: 1 } });
    });
  });
});

// matche.controller.test.ts
import { Request, Response } from "express";
import { matchesController } from "../matches";
import prismaMock from "../../test/__mocks__/prisma";

describe("Matches Controller", () => {
  afterEach(() => {
    jest.clearAllMocks(); // Clear all mocks after each test
  });

  describe("getMatches", () => {
    it("should return matches successfully", async () => {
      const mockData = [
        {
          id: 1,
          away_team_id: 1,
          home_team_id: 2,
          competition_id: 1,
          stadiumId: 1,
        },
        {
          id: 2,
          away_team_id: 2,
          home_team_id: 1,
          competition_id: 1,
          stadiumId: 1,
        },
        {
          id: 3,
          away_team_id: 3,
          home_team_id: 1,
          competition_id: 1,
          stadiumId: 1,
        },
        {
          id: 4,
          away_team_id: 4,
          home_team_id: 1,
          competition_id: 1,
          stadiumId: 1,
        },
      ];
      const req = {} as Request;
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      } as unknown as Response;

      const findManyMock = prismaMock.matches.findMany as jest.Mock;
      findManyMock.mockResolvedValue(mockData);

      await matchesController.getMatches(req, res);

      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith(mockData);
      expect(findManyMock).toHaveBeenCalledTimes(1);
    });

    it("should return status 204 if no matches found", async () => {
      const req = {} as Request;
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      } as unknown as Response;

      const findManyMock = prismaMock.matches.findMany as jest.Mock;
      findManyMock.mockResolvedValue([]);

      await matchesController.getMatches(req, res);

      expect(res.status).toHaveBeenCalledWith(204);
      expect(findManyMock).toHaveBeenCalledTimes(1);
    });
  });

  describe("getMatch", () => {
    it("should return match successfully", async () => {
      const mockData = {
        id: 1,
        away_team_id: 1,
        home_team_id: 2,
        competition_id: 1,
        stadium_id: 1,
      };
      const req = { params: { id: "1" } } as unknown as Request;
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      } as unknown as Response;

      const findOneMock = prismaMock.matches.findUnique as jest.Mock;
      findOneMock.mockResolvedValue(mockData);

      await matchesController.getMatch(req, res);

      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith(mockData);
      expect(findOneMock).toHaveBeenCalledTimes(1);
    });

    it("should return status 404 if no match found", async () => {
      const req = { params: { id: "1" } } as unknown as Request;
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      } as unknown as Response;

      const findOneMock = prismaMock.matches.findUnique as jest.Mock;
      findOneMock.mockResolvedValue(null);

      await matchesController.getMatch(req, res);

      expect(res.status).toHaveBeenCalledWith(404);
      expect(findOneMock).toHaveBeenCalledTimes(1);
    });
  });

  describe("createMatch", () => {
    it("should create a match successfully", async () => {
      const mockData = {
        away_team_id: 1,
        home_team_id: 2,
        competition_id: 1,
        stadiumId: 1,
      };
      const req = {
        body: { matchData: mockData },
      } as Request;
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      } as unknown as Response;

      // Mock the prisma create method
      const createMock = prismaMock.matches.create as jest.Mock;
      createMock.mockResolvedValue(mockData);

      await matchesController.createMatch(req, res);

      expect(res.status).toHaveBeenCalledWith(201);
      expect(res.json).toHaveBeenCalledWith(mockData);
      expect(createMock).toHaveBeenCalledWith({ data: mockData });
    });

    it("should return 400 if matchData is not provided", async () => {
      const req = {
        body: {},
      } as Request;
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      } as unknown as Response;

      await matchesController.createMatch(req, res);

      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith({
        message: "matchData is required",
      });
    });
  });

  describe("updateMatch", () => {
    it("should update a match successfully", async () => {
      const mockData = {
        away_team_id: 1,
        home_team_id: 4,
        competition_id: 1,
        stadiumId: 1,
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
      const updateMock = prismaMock.matches.update as jest.Mock;
      updateMock.mockResolvedValue(mockData);

      await matchesController.updateMatch(req, res);

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

      await matchesController.updateMatch(req, res);

      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith({
        message: "matchData is required",
      });
    });
  });

  describe("deleteMatch", () => {
    it("should delete a match successfully", async () => {
      const req = { params: { id: "1" } } as unknown as Request;
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      } as unknown as Response;

      const deleteMock = prismaMock.matches.delete as jest.Mock;
      deleteMock.mockResolvedValue({});

      await matchesController.deleteMatch(req, res);

      expect(res.status).toHaveBeenCalledWith(200);
      expect(deleteMock).toHaveBeenCalledWith({ where: { id: 1 } });
    });

    it("should return 404 if no match found", async () => {
      const req = { params: { id: "1" } } as unknown as Request;
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      } as unknown as Response;

      const deleteMock = prismaMock.matches.delete as jest.Mock;
      deleteMock.mockResolvedValue(null);

      await matchesController.deleteMatch(req, res);

      expect(res.status).toHaveBeenCalledWith(404);
      expect(deleteMock).toHaveBeenCalledWith({ where: { id: 1 } });
    });
  });
});

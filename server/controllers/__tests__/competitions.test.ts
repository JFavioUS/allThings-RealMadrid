// competitions.controller.test.ts
import { Request, Response } from "express";
import { competitionsController } from "../competitions";
import prismaMock from "../../test/__mocks__/prisma";

describe("Competitions Controller", () => {
  afterEach(() => {
    jest.clearAllMocks(); // Clear all mocks after each test
  });

  describe("getCompetitions", () => {
    it("should return competitions successfully", async () => {
      const mockData = [
        { id: 1, name: "Competition 1", scope: "Europe" },
        { id: 2, name: "Competition 2", scope: "Spain" },
      ];
      const req = {} as Request;
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      } as unknown as Response;

      const findManyMock = prismaMock.competitions.findMany as jest.Mock;
      findManyMock.mockResolvedValue(mockData);

      await competitionsController.getCompetitions(req, res);

      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith(mockData);
      expect(findManyMock).toHaveBeenCalledTimes(1);
    });

    it("should return status 204 if no competitions found", async () => {
      const req = {} as Request;
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      } as unknown as Response;

      const findManyMock = prismaMock.competitions.findMany as jest.Mock;
      findManyMock.mockResolvedValue([]);

      await competitionsController.getCompetitions(req, res);

      expect(res.status).toHaveBeenCalledWith(204);
      expect(findManyMock).toHaveBeenCalledTimes(1);
    });
  });

  describe("getCompetition", () => {
    it("should return competition successfully", async () => {
      const mockData = { id: 1, name: "Competition 1", scope: "Europe" };
      const req = { params: { id: "1" } } as unknown as Request;
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      } as unknown as Response;

      const findOneMock = prismaMock.competitions.findUnique as jest.Mock;
      findOneMock.mockResolvedValue(mockData);

      await competitionsController.getCompetition(req, res);

      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith(mockData);
      expect(findOneMock).toHaveBeenCalledTimes(1);
    });

    it("should return status 404 if no competition found", async () => {
      const req = { params: { id: "1" } } as unknown as Request;
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      } as unknown as Response;

      const findOneMock = prismaMock.competitions.findUnique as jest.Mock;
      findOneMock.mockResolvedValue(null);

      await competitionsController.getCompetition(req, res);

      expect(res.status).toHaveBeenCalledWith(404);
      expect(findOneMock).toHaveBeenCalledTimes(1);
    });
  });

  describe("createCompetition", () => {
    it("should create a competition successfully", async () => {
      const mockData = { name: "New Competition", scope: "Global" };
      const req = {
        body: { competitionData: mockData },
      } as Request;
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      } as unknown as Response;

      // Mock the prisma create method
      const createMock = prismaMock.competitions.create as jest.Mock;
      createMock.mockResolvedValue(mockData);

      await competitionsController.createCompetition(req, res);

      expect(res.status).toHaveBeenCalledWith(201);
      expect(res.json).toHaveBeenCalledWith(mockData);
      expect(createMock).toHaveBeenCalledWith({ data: mockData });
    });

    it("should return 400 if competitionData is not provided", async () => {
      const req = {
        body: {},
      } as Request;
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      } as unknown as Response;

      await competitionsController.createCompetition(req, res);

      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith({
        message: "competitionData is required",
      });
    });
  });

  describe("updateCompetition", () => {
    it("should update a competition successfully", async () => {
      const mockData = { name: "Updated Competition", scope: "Local" };
      const req = {
        params: { id: "1" },
        body: { matchData: mockData },
      } as unknown as Request;
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      } as unknown as Response;

      // Mock the prisma update method
      const updateMock = prismaMock.competitions.update as jest.Mock;
      updateMock.mockResolvedValue(mockData);

      await competitionsController.updateCompetition(req, res);

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

      await competitionsController.updateCompetition(req, res);

      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith({
        message: "matchData is required",
      });
    });
  });

  describe("deleteCompetition", () => {
    it("should delete a competition successfully", async () => {
      const req = { params: { id: "1" } } as unknown as Request;
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      } as unknown as Response;

      const deleteMock = prismaMock.competitions.delete as jest.Mock;
      deleteMock.mockResolvedValue({});

      await competitionsController.deleteCompetition(req, res);

      expect(res.status).toHaveBeenCalledWith(200);
      expect(deleteMock).toHaveBeenCalledWith({ where: { id: 1 } });
    });

    it("should return 404 if no competition found", async () => {
      const req = { params: { id: "1" } } as unknown as Request;
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      } as unknown as Response;

      const deleteMock = prismaMock.competitions.delete as jest.Mock;
      deleteMock.mockResolvedValue(null);

      await competitionsController.deleteCompetition(req, res);

      expect(res.status).toHaveBeenCalledWith(404);
      expect(deleteMock).toHaveBeenCalledWith({ where: { id: 1 } });
    });
  });
});

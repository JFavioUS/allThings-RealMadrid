// predictions.controller.test.ts
import { Request, Response } from "express";
import { predictionsController } from "../predictions";
import prismaMock from "../../test/__mocks__/prisma";

describe("Predictions Controller", () => {
  afterEach(() => {
    jest.clearAllMocks(); // Clear all mocks after each test
  });

  describe("getPredictions", () => {
    it("should return predictions successfully", async () => {
      const mockData = [
        { id: 1, author: "faviosauto", awayGoals: 2, homeGoals: 1, matchId: 1 },
        { id: 2, author: "faviosauto", awayGoals: 1, homeGoals: 2, matchId: 2 },
      ];
      const req = {} as Request;
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      } as unknown as Response;

      const findManyMock = prismaMock.predictions.findMany as jest.Mock;
      findManyMock.mockResolvedValue(mockData);

      await predictionsController.getPredictions(req, res);

      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith(mockData);
      expect(findManyMock).toHaveBeenCalledTimes(1);
    });

    it("should return status 204 if no predictions found", async () => {
      const req = {} as Request;
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      } as unknown as Response;

      const findManyMock = prismaMock.predictions.findMany as jest.Mock;
      findManyMock.mockResolvedValue([]);

      await predictionsController.getPredictions(req, res);

      expect(res.status).toHaveBeenCalledWith(204);
      expect(findManyMock).toHaveBeenCalledTimes(1);
    });
  });

  describe("getPrediction", () => {
    it("should return prediction successfully", async () => {
      const mockData = {
        id: 1,
        author: "faviosauto",
        awayGoals: 2,
        homeGoals: 1,
        matchId: 1,
      };
      const req = { params: { id: "1" } } as unknown as Request;
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      } as unknown as Response;

      const findOneMock = prismaMock.predictions.findUnique as jest.Mock;
      findOneMock.mockResolvedValue(mockData);

      await predictionsController.getPrediction(req, res);

      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith(mockData);
      expect(findOneMock).toHaveBeenCalledTimes(1);
    });

    it("should return status 404 if no prediction found", async () => {
      const req = { params: { id: "1" } } as unknown as Request;
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      } as unknown as Response;

      const findOneMock = prismaMock.predictions.findUnique as jest.Mock;
      findOneMock.mockResolvedValue(null);

      await predictionsController.getPrediction(req, res);

      expect(res.status).toHaveBeenCalledWith(404);
      expect(findOneMock).toHaveBeenCalledTimes(1);
    });
  });

  describe("createPrediction", () => {
    it("should create a prediction successfully", async () => {
      const mockData = {
        author: "faviosauto",
        awayGoals: 3,
        homeGoals: 1,
        matchId: 3,
      };
      const req = {
        body: { predictionData: mockData },
      } as Request;
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      } as unknown as Response;

      // Mock the prisma create method
      const createMock = prismaMock.predictions.create as jest.Mock;
      createMock.mockResolvedValue(mockData);

      await predictionsController.createPrediction(req, res);

      expect(res.status).toHaveBeenCalledWith(201);
      expect(res.json).toHaveBeenCalledWith(mockData);
      expect(createMock).toHaveBeenCalledWith({ data: mockData });
    });

    it("should return 400 if predictionData is not provided", async () => {
      const req = {
        body: {},
      } as Request;
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      } as unknown as Response;

      await predictionsController.createPrediction(req, res);

      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith({
        message: "predictionData is required",
      });
    });
  });

  describe("updatePrediction", () => {
    it("should update a prediction successfully", async () => {
      const mockData = {
        author: "faviosauto",
        awayGoals: 4,
        homeGoals: 1,
        matchId: 1,
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
      const updateMock = prismaMock.predictions.update as jest.Mock;
      updateMock.mockResolvedValue(mockData);

      await predictionsController.updatePrediction(req, res);

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

      await predictionsController.updatePrediction(req, res);

      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith({
        message: "matchData is required",
      });
    });
  });

  describe("deletePrediction", () => {
    it("should delete a prediction successfully", async () => {
      const req = { params: { id: "1" } } as unknown as Request;
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      } as unknown as Response;

      const deleteMock = prismaMock.predictions.delete as jest.Mock;
      deleteMock.mockResolvedValue({});

      await predictionsController.deletePrediction(req, res);

      expect(res.status).toHaveBeenCalledWith(200);
      expect(deleteMock).toHaveBeenCalledWith({ where: { id: 1 } });
    });

    it("should return 404 if no prediction found", async () => {
      const req = { params: { id: "1" } } as unknown as Request;
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      } as unknown as Response;

      const deleteMock = prismaMock.predictions.delete as jest.Mock;
      deleteMock.mockResolvedValue(null);

      await predictionsController.deletePrediction(req, res);

      expect(res.status).toHaveBeenCalledWith(404);
      expect(deleteMock).toHaveBeenCalledWith({ where: { id: 1 } });
    });
  });
});

// stadiums.controller.test.ts
import { Request, Response } from "express";
import { stadiumsController } from "../stadiums";
import prismaMock from "../../test/__mocks__/prisma";

describe("Stadiums Controller", () => {
  afterEach(() => {
    jest.clearAllMocks(); // Clear all mocks after each test
  });

  describe("getStadiums", () => {
    it("should return stadiums successfully", async () => {
      const mockData = [
        { id: 1, name: "Stadium 1", city: "Madrid", country: "Spain" },
        { id: 2, name: "Stadium 2", city: "Barcelona", country: "Spain" },
      ];
      const req = {} as Request;
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      } as unknown as Response;

      const findManyMock = prismaMock.stadiums.findMany as jest.Mock;
      findManyMock.mockResolvedValue(mockData);

      await stadiumsController.getStadiums(req, res);

      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith(mockData);
      expect(findManyMock).toHaveBeenCalledTimes(1);
    });

    it("should return status 204 if no stadiums found", async () => {
      const req = {} as Request;
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      } as unknown as Response;

      const findManyMock = prismaMock.stadiums.findMany as jest.Mock;
      findManyMock.mockResolvedValue([]);

      await stadiumsController.getStadiums(req, res);

      expect(res.status).toHaveBeenCalledWith(204);
      expect(findManyMock).toHaveBeenCalledTimes(1);
    });
  });

  describe("getStadium", () => {
    it("should return stadium successfully", async () => {
      const mockData = {
        id: 1,
        name: "Stadium 1",
        city: "Madrid",
        country: "Spain",
      };
      const req = { params: { id: "1" } } as unknown as Request;
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      } as unknown as Response;

      const findOneMock = prismaMock.stadiums.findUnique as jest.Mock;
      findOneMock.mockResolvedValue(mockData);

      await stadiumsController.getStadium(req, res);

      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith(mockData);
      expect(findOneMock).toHaveBeenCalledTimes(1);
    });

    it("should return status 404 if no stadium found", async () => {
      const req = { params: { id: "1" } } as unknown as Request;
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      } as unknown as Response;

      const findOneMock = prismaMock.stadiums.findUnique as jest.Mock;
      findOneMock.mockResolvedValue(null);

      await stadiumsController.getStadium(req, res);

      expect(res.status).toHaveBeenCalledWith(404);
      expect(findOneMock).toHaveBeenCalledTimes(1);
    });
  });

  describe("createStadium", () => {
    it("should create a stadium successfully", async () => {
      const mockData = { name: "Stadium 1", city: "Madrid", country: "Spain" };
      const req = {
        body: { stadiumData: mockData },
      } as Request;
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      } as unknown as Response;

      // Mock the prisma create method
      const createMock = prismaMock.stadiums.create as jest.Mock;
      createMock.mockResolvedValue(mockData);

      await stadiumsController.createStadium(req, res);

      expect(res.status).toHaveBeenCalledWith(201);
      expect(res.json).toHaveBeenCalledWith(mockData);
      expect(createMock).toHaveBeenCalledWith({ data: mockData });
    });

    it("should return 400 if stadiumData is not provided", async () => {
      const req = {
        body: {},
      } as Request;
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      } as unknown as Response;

      await stadiumsController.createStadium(req, res);

      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith({
        message: "stadiumData is required",
      });
    });
  });

  describe("updateStadium", () => {
    it("should update a stadium successfully", async () => {
      const mockData = { name: "Stadium 1", city: "Madrid", country: "Spain" };
      const req = {
        params: { id: "1" },
        body: { matchData: mockData },
      } as unknown as Request;
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      } as unknown as Response;

      // Mock the prisma update method
      const updateMock = prismaMock.stadiums.update as jest.Mock;
      updateMock.mockResolvedValue(mockData);

      await stadiumsController.updateStadium(req, res);

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

      await stadiumsController.updateStadium(req, res);

      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith({
        message: "matchData is required",
      });
    });
  });

  describe("deleteStadium", () => {
    it("should delete a stadium successfully", async () => {
      const req = { params: { id: "1" } } as unknown as Request;
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      } as unknown as Response;

      const deleteMock = prismaMock.stadiums.delete as jest.Mock;
      deleteMock.mockResolvedValue({});

      await stadiumsController.deleteStadium(req, res);

      expect(res.status).toHaveBeenCalledWith(200);
      expect(deleteMock).toHaveBeenCalledWith({ where: { id: 1 } });
    });

    it("should return 404 if no stadium found", async () => {
      const req = { params: { id: "1" } } as unknown as Request;
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      } as unknown as Response;

      const deleteMock = prismaMock.stadiums.delete as jest.Mock;
      deleteMock.mockResolvedValue(null);

      await stadiumsController.deleteStadium(req, res);

      expect(res.status).toHaveBeenCalledWith(404);
      expect(deleteMock).toHaveBeenCalledWith({ where: { id: 1 } });
    });
  });
});

// reviews.controller.test.ts
import { Request, Response } from "express";
import { reviewsController } from "../reviews";
import prismaMock from "../../test/__mocks__/prisma";

describe("Reviews Controller", () => {
  afterEach(() => {
    jest.clearAllMocks(); // Clear all mocks after each test
  });

  describe("getReviews", () => {
    it("should return reviews successfully", async () => {
      const mockData = [
        {
          id: 1,
          author: "faviosauto",
          title: "Real Madrid barely wins against Sevilla",
          content: "Real Madrid barely wins against Sevilla",
          matchId: 1,
        },
        {
          id: 2,
          author: "faviosauto",
          title: "Real Madrid barely wins against Barcelona",
          content: "Real Madrid barely wins against Barcelona",
          matchId: 2,
        },
      ];
      const req = {} as Request;
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      } as unknown as Response;

      const findManyMock = prismaMock.reviews.findMany as jest.Mock;
      findManyMock.mockResolvedValue(mockData);

      await reviewsController.getReviews(req, res);

      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith(mockData);
      expect(findManyMock).toHaveBeenCalledTimes(1);
    });

    it("should return status 204 if no reviews found", async () => {
      const req = {} as Request;
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      } as unknown as Response;

      const findManyMock = prismaMock.reviews.findMany as jest.Mock;
      findManyMock.mockResolvedValue([]);

      await reviewsController.getReviews(req, res);

      expect(res.status).toHaveBeenCalledWith(204);
      expect(findManyMock).toHaveBeenCalledTimes(1);
    });
  });

  describe("getReview", () => {
    it("should return review successfully", async () => {
      const mockData = {
        id: 1,
        author: "faviosauto",
        title: "Real Madrid barely wins against Sevilla",
        content: "Real Madrid barely wins against Sevilla",
        matchId: 1,
      };
      const req = { params: { id: "1" } } as unknown as Request;
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      } as unknown as Response;

      const findOneMock = prismaMock.reviews.findUnique as jest.Mock;
      findOneMock.mockResolvedValue(mockData);

      await reviewsController.getReview(req, res);

      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith(mockData);
      expect(findOneMock).toHaveBeenCalledTimes(1);
    });

    it("should return status 404 if no review found", async () => {
      const req = { params: { id: "1" } } as unknown as Request;
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      } as unknown as Response;

      const findOneMock = prismaMock.reviews.findUnique as jest.Mock;
      findOneMock.mockResolvedValue(null);

      await reviewsController.getReview(req, res);

      expect(res.status).toHaveBeenCalledWith(404);
      expect(findOneMock).toHaveBeenCalledTimes(1);
    });
  });

  describe("createReview", () => {
    it("should create a review successfully", async () => {
      const mockData = {
        author: "faviosauto",
        title: "Real Madrid barely wins against Sevilla",
        content: "Real Madrid barely wins against Sevilla",
        matchId: 1,
      };
      const req = {
        body: { reviewData: mockData },
      } as Request;
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      } as unknown as Response;

      // Mock the prisma create method
      const createMock = prismaMock.reviews.create as jest.Mock;
      createMock.mockResolvedValue(mockData);

      await reviewsController.createReview(req, res);

      expect(res.status).toHaveBeenCalledWith(201);
      expect(res.json).toHaveBeenCalledWith(mockData);
      expect(createMock).toHaveBeenCalledWith({ data: mockData });
    });

    it("should return 400 if reviewData is not provided", async () => {
      const req = {
        body: {},
      } as Request;
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      } as unknown as Response;

      await reviewsController.createReview(req, res);

      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith({
        message: "reviewData is required",
      });
    });
  });

  describe("updateReview", () => {
    it("should update a review successfully", async () => {
      const mockData = {
        id: 1,
        author: "faviosauto",
        title: "Real Madrid barely wins against Rayo Vallecano",
        content: "Real Madrid barely wins against Rayo Vallecano",
        matchId: 3,
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
      const updateMock = prismaMock.reviews.update as jest.Mock;
      updateMock.mockResolvedValue(mockData);

      await reviewsController.updateReview(req, res);

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

      await reviewsController.updateReview(req, res);

      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith({
        message: "matchData is required",
      });
    });
  });

  describe("deleteReview", () => {
    it("should delete a review successfully", async () => {
      const req = { params: { id: "1" } } as unknown as Request;
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      } as unknown as Response;

      const deleteMock = prismaMock.reviews.delete as jest.Mock;
      deleteMock.mockResolvedValue({});

      await reviewsController.deleteReview(req, res);

      expect(res.status).toHaveBeenCalledWith(200);
      expect(deleteMock).toHaveBeenCalledWith({ where: { id: 1 } });
    });

    it("should return 404 if no review found", async () => {
      const req = { params: { id: "1" } } as unknown as Request;
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      } as unknown as Response;

      const deleteMock = prismaMock.reviews.delete as jest.Mock;
      deleteMock.mockResolvedValue(null);

      await reviewsController.deleteReview(req, res);

      expect(res.status).toHaveBeenCalledWith(404);
      expect(deleteMock).toHaveBeenCalledWith({ where: { id: 1 } });
    });
  });
});

import { PrismaClient } from "@prisma/client";
import { mockDeep, DeepMockProxy } from "jest-mock-extended";

// Create a deep mock
const prismaMock = mockDeep<PrismaClient>();

// Override prismaMock's $connect and $disconnect to be no-op functions
prismaMock.$connect.mockImplementation(() => Promise.resolve());
prismaMock.$disconnect.mockImplementation(() => Promise.resolve());

// Cast to unknown first to bypass typescript warning
export default prismaMock as unknown as PrismaClient;

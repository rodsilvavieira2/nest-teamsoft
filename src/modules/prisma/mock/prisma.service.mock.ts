import { clientMock } from '@src/__mocks__/@prisma/entities';
import { withDbMetadata } from '@src/__mocks__/@prisma/helpers';

const mockedResult = withDbMetadata(clientMock());

const actions = {
  findFirst: jest.fn().mockResolvedValue(mockedResult),

  create: jest.fn().mockResolvedValue(mockedResult),

  findMany: jest.fn().mockResolvedValue(mockedResult),

  update: jest.fn().mockResolvedValue(mockedResult),

  delete: jest.fn().mockResolvedValue(undefined),
};

export const prismaServiceMock = {
  addresses: actions,
  clients: actions,
};

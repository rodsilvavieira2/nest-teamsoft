import { clientMock } from '@src/__mocks__/@prisma/entities';
import { withDbMetadata } from '@src/__mocks__/@prisma/helpers';

const result = withDbMetadata(clientMock());

export const clientServiceMock = {
  findOne: jest.fn().mockResolvedValue(result),

  create: jest.fn().mockResolvedValue(result),

  findAll: jest.fn().mockResolvedValue(result),

  update: jest.fn().mockResolvedValue(result),

  remove: jest.fn().mockResolvedValue(result),
};

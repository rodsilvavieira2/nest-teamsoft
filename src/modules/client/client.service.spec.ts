import { faker } from '@faker-js/faker';
import { BadRequestException, NotFoundException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { clientMock } from '@src/__mocks__/@prisma/entities';
import { prismaServiceMock } from '../prisma/mock/prisma.service.mock';
import { PrismaService } from '../prisma/prisma.service';

import { ClientService } from './client.service';
import { CreateClientDto } from './dto/create-client.dto';

describe('ClientService', () => {
  let service: ClientService;
  let prismaService: typeof prismaServiceMock;
  let client: CreateClientDto;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ClientService, PrismaService],
    })
      .overrideProvider(PrismaService)
      .useValue(prismaServiceMock)
      .compile();

    service = module.get<ClientService>(ClientService);
    prismaService = module.get(PrismaService);

    client = clientMock();

    jest.resetAllMocks();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('METHOD: create', () => {
    it('should create a new client', async () => {
      prismaService.clients.findFirst.mockResolvedValue(null);

      prismaService.clients.create.mockResolvedValue(client);

      const result = await service.create(client);

      expect(prismaService.clients.findFirst).toBeCalledWith({
        where: {
          cnpj: client.cnpj,
        },
      });

      expect(prismaService.clients.create).toBeCalledWith({
        data: client,
      });

      expect(result).toEqual(client);
    });

    it('should throw if sent a CNPJ already registered', async () => {
      prismaService.clients.findFirst.mockResolvedValue(client);

      await expect(() => service.create(client)).rejects.toThrowError(
        new BadRequestException('CNPJ already exists'),
      );

      expect(prismaService.clients.findFirst).toBeCalledWith({
        where: {
          cnpj: client.cnpj,
        },
      });

      expect(prismaService.clients.create).not.toBeCalled();
    });
  });

  describe('METHOD: findAll', () => {
    it('should list all clients', async () => {
      const mockedResult = [client];

      prismaService.clients.findMany.mockReturnValue(mockedResult);

      const result = await service.findAll();

      expect(prismaService.clients.findMany).toBeCalledWith({
        include: { addresses: true },
      });

      expect(result).toEqual(
        expect.arrayContaining([expect.objectContaining(client)]),
      );
    });
  });

  describe('METHOD: remove', () => {
    it('should delete a registered client', async () => {
      const id = faker.datatype.number();

      prismaService.clients.findFirst.mockResolvedValue(client);

      const result = await service.remove(id);

      expect(prismaService.clients.findFirst).toHaveBeenCalledWith({
        where: { id },
      });

      expect(prismaService.clients.delete).toHaveBeenCalledWith({
        where: { id },
      });

      expect(result).toBeFalsy();
    });

    it('should throw if set a not registered client', async () => {
      const id = faker.datatype.number();

      prismaService.clients.findFirst.mockResolvedValue(null);

      await expect(() => service.remove(id)).rejects.toThrowError(
        new NotFoundException('client not found'),
      );

      expect(prismaService.clients.findFirst).toHaveBeenCalledWith({
        where: { id },
      });

      expect(prismaService.clients.delete).not.toBeCalled();
    });
  });

  describe('METHOD: update', () => {
    it('should update a registered client', async () => {
      const id = faker.datatype.number();
      const cellphone = faker.phone.number();

      prismaService.clients.findFirst.mockResolvedValue(client);

      prismaService.clients.update.mockResolvedValue(client);

      const result = await service.update(id, { cellphone });

      expect(prismaService.clients.findFirst).toHaveBeenCalledWith({
        where: { id },
      });

      expect(prismaService.clients.update).toHaveBeenCalledWith({
        where: { id },
        data: {
          cellphone,
        },
      });

      expect(result).toEqual(client);
    });

    it('should throw if not found a client', async () => {
      const id = faker.datatype.number();

      prismaService.clients.findFirst.mockResolvedValue(null);

      await expect(() => service.update(id, client)).rejects.toThrowError(
        new NotFoundException('client not found'),
      );

      expect(prismaService.clients.findFirst).toBeCalledWith({ where: { id } });

      expect(prismaService.clients.update).not.toBeCalled();
    });
  });

  describe('METHOD: findOne', () => {
    it('should find a registered client', async () => {
      const id = faker.datatype.number();

      prismaService.clients.findFirst.mockResolvedValue(client);

      const result = await service.findOne(id);

      expect(prismaService.clients.findFirst).toBeCalledWith({
        where: { id },
        include: { addresses: true },
      });

      expect(result).toEqual(client);
    });

    it('should throw if not a registered client', async () => {
      const id = faker.datatype.number();

      prismaService.clients.findFirst.mockResolvedValue(null);

      await expect(() => service.findOne(id)).rejects.toThrowError(
        new NotFoundException('client not found'),
      );

      expect(prismaService.clients.findFirst).toBeCalledWith({
        where: { id },
        include: { addresses: true },
      });
    });
  });
});

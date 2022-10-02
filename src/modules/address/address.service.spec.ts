import { faker } from '@faker-js/faker';
import { NotFoundException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { clientMock, addressMock } from '@src/__mocks__/@prisma/entities';
import { CreateClientDto } from '../client/dto/create-client.dto';
import { GoogleGeocodingService } from '../google-geocoding/google-geocoding.service';
import { googleGeocodingServiceMock } from '../google-geocoding/mock/google-geocoding.service.mock';
import { prismaServiceMock } from '../prisma/mock/prisma.service.mock';
import { PrismaService } from '../prisma/prisma.service';

import { AddressService } from './address.service';
import { CreateAddressDto } from './dto/create-address.dto';

describe('AddressService', () => {
  let service: AddressService;
  let prismaService: typeof prismaServiceMock;
  let googleGeocodingService: typeof googleGeocodingServiceMock;
  let client: CreateClientDto;
  let address: CreateAddressDto;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [GoogleGeocodingService, PrismaService, AddressService],
    })
      .overrideProvider(GoogleGeocodingService)
      .useValue(googleGeocodingServiceMock)
      .overrideProvider(PrismaService)
      .useValue(prismaServiceMock)
      .compile();

    service = module.get<AddressService>(AddressService);

    prismaService = module.get(PrismaService);

    googleGeocodingService = module.get(GoogleGeocodingService);

    client = clientMock();
    address = addressMock();

    jest.resetAllMocks();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('METHOD: create', () => {
    it('should create a new address', async () => {
      const location = {
        lat: faker.datatype.number(),
        lng: faker.datatype.number(),
      };

      prismaService.clients.findFirst.mockResolvedValue(client);
      prismaService.addresses.create.mockResolvedValue(address);
      googleGeocodingService.getCoordenantes.mockResolvedValue(location);

      const result = await service.create(address);

      expect(prismaService.clients.findFirst).toBeCalledWith({
        where: { id: address.clientId },
      });

      const {
        district,
        number,
        publicSpace,
        state,
        city,
        zipCode,
        complement,
      } = address;

      expect(googleGeocodingService.getCoordenantes).toBeCalledWith({
        district,
        number,
        publicSpace,
        state,
        city,
        zipCode,
        complement,
      });

      const { lat, lng } = location;

      expect(prismaService.addresses.create).toBeCalledWith({
        data: {
          ...address,
          latitude: lat,
          longitude: lng,
        },
      });

      expect(result).toEqual(address);
    });

    it('should throw if not find a client for the address', async () => {
      prismaService.clients.findFirst.mockResolvedValue(null);

      await expect(() => service.create(address)).rejects.toThrowError(
        new NotFoundException('client not found'),
      );

      expect(prismaService.clients.findFirst).toBeCalledWith({
        where: { id: +address.clientId },
      });
    });
  });

  describe('METHOD: findAll', () => {
    it('should find all address registered', async () => {
      const mockedReturn = [address];

      prismaService.addresses.findMany.mockResolvedValue(mockedReturn);

      const result = await service.findAll();

      expect(prismaService.addresses.findMany).toBeCalled();

      expect(result).toEqual(mockedReturn);
    });
  });

  describe('METHOD: findOne', () => {
    it('should find a address', async () => {
      const id = faker.datatype.number();

      prismaService.addresses.findFirst.mockResolvedValue(address);

      const result = await service.findOne(id);

      expect(prismaService.addresses.findFirst).toBeCalledWith({
        where: { id },
      });

      expect(result).toEqual(address);
    });

    it('should throw if not find a address', async () => {
      const id = faker.datatype.number();

      prismaService.addresses.findFirst.mockReturnValue(null);

      await expect(() => service.findOne(id)).rejects.toThrowError(
        new NotFoundException('address not found'),
      );

      expect(prismaService.addresses.findFirst).toBeCalledWith({
        where: { id },
      });
    });
  });

  describe('METHOD: update', () => {
    it('should update a address', async () => {
      const id = faker.datatype.number();

      const location = {
        lat: faker.datatype.number(),
        lng: faker.datatype.number(),
      };

      prismaService.clients.findFirst.mockResolvedValue(client);
      googleGeocodingService.getCoordenantes.mockResolvedValue(location);
      prismaService.addresses.update.mockResolvedValue(address);

      const result = await service.update(id, address);

      expect(prismaService.clients.findFirst).toBeCalledWith({
        where: { id },
      });

      const {
        district,
        number,
        publicSpace,
        state,
        city,
        zipCode,
        complement,
      } = address;

      expect(googleGeocodingService.getCoordenantes).toBeCalledWith({
        district,
        number,
        publicSpace,
        state,
        city,
        zipCode,
        complement,
      });

      const { lat, lng } = location;

      expect(prismaService.addresses.update).toBeCalledWith({
        data: {
          district,
          number,
          publicSpace,
          state,
          city,
          zipCode,
          complement,
          latitude: lat,
          longitude: lng,
        },
        where: {
          id,
        },
      });

      expect(result).toEqual(address);
    });

    it('should throw if not find the address', async () => {
      const id = faker.datatype.number();

      prismaService.addresses.findFirst.mockResolvedValue(null);

      await expect(() => service.update(id, address)).rejects.toThrowError(
        new NotFoundException('address not found'),
      );

      expect(prismaService.addresses.findFirst).toBeCalledWith({
        where: { id },
      });
    });
  });

  describe('METHOD: remove', () => {
    it('should delete a address', async () => {
      const id = faker.datatype.number();

      prismaService.addresses.findFirst.mockResolvedValue(address);

      const result = await service.remove(id);

      expect(prismaService.addresses.findFirst).toBeCalledWith({
        where: { id },
      });

      expect(prismaService.addresses.delete).toBeCalledWith({
        where: { id },
      });

      expect(result).toBeFalsy();
    });

    it('should throw it not find a client', async () => {
      const id = faker.datatype.number();

      prismaService.addresses.findFirst.mockResolvedValue(null);

      await expect(() => service.remove(id)).rejects.toThrowError(
        new NotFoundException('address not found'),
      );

      expect(prismaService.addresses.findFirst).toBeCalledWith({
        where: { id },
      });
    });
  });
});

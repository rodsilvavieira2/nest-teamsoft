import { faker } from '@faker-js/faker';
import { Test, TestingModule } from '@nestjs/testing';
import { addressMock } from '@src/__mocks__/@prisma/entities';
import { AddressController } from './address.controller';
import { AddressService } from './address.service';
import { CreateAddressDto } from './dto/create-address.dto';
import { addressServiceMock } from './mock/address.service.mock';

describe('AddressController', () => {
  let controller: AddressController;
  let service: typeof addressServiceMock;
  let address: CreateAddressDto;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AddressController],
      providers: [AddressService],
    })
      .overrideProvider(AddressService)
      .useValue(addressServiceMock)
      .compile();

    controller = module.get<AddressController>(AddressController);
    service = module.get(AddressService);

    address = addressMock();

    jest.resetAllMocks();
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('POST: /address', () => {
    it('should create a address', async () => {
      service.create.mockResolvedValue(address);

      const result = await controller.create(address);

      expect(service.create).toBeCalledWith(address);

      expect(result).toEqual(address);
    });

    it('should throw if happened a error', async () => {
      service.create.mockRejectedValue(new Error('mock'));

      await expect(() => controller.create(address)).rejects.toThrowError(
        'mock',
      );

      expect(service.create).toBeCalledWith(address);
    });
  });

  describe('GET /address', () => {
    it('should get all address', async () => {
      const mockedReturn = [address];

      service.findAll.mockResolvedValue(mockedReturn);

      const result = await controller.findAll();

      expect(service.findAll).toBeCalled();

      expect(result).toEqual(mockedReturn);
    });

    it('should throw if happened a error', async () => {
      service.findAll.mockRejectedValue(new Error('mock'));

      await expect(() => controller.findAll()).rejects.toThrowError('mock');

      expect(service.findAll).toBeCalled();
    });
  });

  describe('GET /address/{id}', () => {
    it('should get a address', async () => {
      const id = faker.datatype.number();

      service.findOne.mockResolvedValue(address);

      const result = await controller.findOne(id);

      expect(service.findOne).toBeCalledWith(+id);

      expect(result).toEqual(address);
    });

    it('should throw if happened a error', async () => {
      const id = faker.datatype.number();

      service.findOne.mockRejectedValue(new Error('mock'));

      await expect(() => controller.findOne(id)).rejects.toThrowError('mock');

      expect(service.findOne).toBeCalledWith(+id);
    });
  });

  describe('PATCH /address/{id}', () => {
    it('should update a address', async () => {
      const id = faker.datatype.number();

      service.update.mockResolvedValue(address as any);

      const result = await controller.update(id, address);

      expect(service.update).toBeCalledWith(+id, address);

      expect(result).toEqual(address);
    });

    it('should throw if happened a error', async () => {
      const id = faker.datatype.number();

      service.update.mockRejectedValue(new Error('mock'));

      await expect(() => controller.update(id, address)).rejects.toThrowError(
        'mock',
      );

      expect(service.update).toBeCalledWith(+id, address);
    });
  });

  describe('DELETE /address/{id}', () => {
    it('should delete a address', async () => {
      const id = faker.datatype.number();

      const result = await controller.remove(id);

      expect(result).toBeFalsy();

      expect(service.remove).toBeCalledWith(+id);
    });

    it('should throw if happened a error', async () => {
      const id = faker.datatype.number();

      service.remove.mockRejectedValue(new Error('mock'));

      await expect(() => controller.remove(id)).rejects.toThrowError('mock');

      expect(service.remove).toBeCalledWith(+id);
    });
  });
});

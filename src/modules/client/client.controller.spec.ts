import { faker } from '@faker-js/faker';
import { Test, TestingModule } from '@nestjs/testing';
import { clientMock } from '@src/__mocks__/@prisma/entities';
import { ClientController } from './client.controller';
import { ClientService } from './client.service';
import { CreateClientDto } from './dto/create-client.dto';
import { clientServiceMock } from './mocks/client.service.mock';

describe('ClientController', () => {
  let controller: ClientController;
  let service: typeof clientServiceMock;
  let client: CreateClientDto;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ClientController],
      providers: [ClientService],
    })
      .overrideProvider(ClientService)
      .useValue(clientServiceMock)
      .compile();

    controller = module.get<ClientController>(ClientController);
    service = module.get(ClientService);

    client = clientMock();

    jest.resetAllMocks();
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('GET /client', () => {
    it('should list all clients', async () => {
      const mockedReturn = [client];

      service.findAll.mockResolvedValue(mockedReturn);

      const result = await controller.findAll();

      expect(service.findAll).toBeCalled();

      expect(result).toEqual(mockedReturn);
    });

    it('should throw if happen a error', async () => {
      service.findAll.mockRejectedValue(new Error('mock'));

      await expect(() => controller.findAll()).rejects.toThrow('mock');
    });
  });

  describe('GET /client/{id}', () => {
    it('should get a client', async () => {
      const id = faker.datatype.number();

      service.findOne.mockResolvedValue(client);

      const result = await controller.findOne(id);

      expect(service.findOne).toBeCalledWith(+id);

      expect(result).toEqual(client);
    });

    it('should throw if happen a error', async () => {
      const id = faker.datatype.number();

      service.findOne.mockRejectedValue(new Error('mock'));

      await expect(() => controller.findOne(id)).rejects.toThrow('mock');
    });
  });

  describe('POST /client', () => {
    it('should create  a client', async () => {
      service.create.mockResolvedValue(client);

      const result = await controller.create(client);

      expect(service.create).toBeCalledWith(client);

      expect(result).toEqual(client);
    });

    it('should throw if happen a error', async () => {
      service.create.mockRejectedValue(new Error('mock'));

      await expect(() => controller.create(client)).rejects.toThrow('mock');
    });
  });

  describe('PATCH /client/{id}', () => {
    it('should update a client', async () => {
      const id = faker.datatype.number();

      service.update.mockResolvedValue(client);

      const result = await controller.update(id, client);

      expect(service.update).toBeCalledWith(+id, client);

      expect(result).toEqual(client);
    });

    it('should throw if happen a error', async () => {
      const id = faker.datatype.number();

      service.update.mockRejectedValue(new Error('mock'));

      await expect(() => controller.update(id, client)).rejects.toThrow('mock');
    });
  });

  describe('DELETE /client/{id}', () => {
    it('should delete a client', async () => {
      const id = faker.datatype.number();

      const result = await controller.remove(id);

      expect(service.remove).toBeCalledWith(+id);

      expect(result).toBeFalsy();
    });

    it('should throw if happen a error', async () => {
      const id = faker.datatype.number();

      service.remove.mockRejectedValue(new Error('mock'));

      await expect(() => controller.remove(id)).rejects.toThrow('mock');
    });
  });
});

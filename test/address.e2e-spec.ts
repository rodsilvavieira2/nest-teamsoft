import { faker } from '@faker-js/faker';
import { INestApplication } from '@nestjs/common';

import { CreateAddressDto } from '@src/modules/address/dto/create-address.dto';
import { CreateClientDto } from '@src/modules/client/dto/create-client.dto';
import { PrismaService } from '@src/modules/prisma/prisma.service';
import { addressMock, clientMock } from '@src/__mocks__/@prisma/entities';

import * as request from 'supertest';
import { setUpApp } from './helpers';

describe('AddressController (e2e)', () => {
  let app: INestApplication;
  let prismaService: PrismaService;
  let address: CreateAddressDto;
  let client: CreateClientDto;

  beforeEach(() => {
    address = addressMock();
    client = clientMock();
  });

  beforeAll(async () => {
    const config = await setUpApp();

    app = config.app;
    prismaService = config.prismaService;
  });

  afterAll(async () => {
    await app.close();
  });

  describe('/address (POST)', () => {
    it('should create a new address', async () => {
      const { id: clientId } = await prismaService.clients.create({
        data: client,
      });

      const data = {
        ...address,
        clientId,
      };

      const { body } = await request(app.getHttpServer())
        .post('/address')
        .send(data)
        .expect(201);

      expect(body).toEqual(expect.objectContaining(data));
    });

    it('should not create a address if sent a not registered client', async () => {
      const data = client;

      await request(app.getHttpServer())
        .post('/address')
        .send(data)
        .expect(400);
    });

    it('should not create a address if sent invalid atributes', async () => {
      const { city, number } = address;

      await request(app.getHttpServer())
        .post('/client')
        .send({ city, number })
        .expect(400);
    });
  });

  describe('/address/{i} (GET) ', () => {
    it('should find a registered address', async () => {
      const { id: clientId } = await prismaService.clients.create({
        data: client,
      });

      const data = {
        ...address,
        clientId,
      };

      const { id } = await prismaService.addresses.create({ data });

      const { body } = await request(app.getHttpServer())
        .get(`/address/${id}`)
        .expect(200);

      expect(body).toEqual(expect.objectContaining(data));
    });

    it('should sent a not found status if not found a address', async () => {
      const id = faker.datatype.number();

      await request(app.getHttpServer()).get(`/address/${id}`).expect(404);
    });
  });

  describe('/address (GET)', () => {
    it('should find all registered addresses', async () => {
      const usersData = Array.from({ length: 2 }).map(() => ({
        ...clientMock(),
        id: faker.datatype.number(),
      }));

      await prismaService.clients.createMany({
        data: usersData,
      });

      const data = usersData.map(({ id }) => ({
        ...address,
        clientId: id,
      }));

      await prismaService.addresses.createMany({
        data,
      });

      const { body } = await request(app.getHttpServer())
        .get(`/address`)
        .expect(200);

      expect(body).toBeTruthy();

      data.forEach((address) => {
        expect(body).toEqual(
          expect.arrayContaining([expect.objectContaining(address)]),
        );
      });
    });
  });

  describe('/address/{id} (DELETE)', () => {
    it('should delete a registered address', async () => {
      const { id: clientId } = await prismaService.clients.create({
        data: client,
      });

      const { id: addressId } = await prismaService.addresses.create({
        data: {
          ...address,
          clientId,
        },
      });

      const { body } = await request(app.getHttpServer())
        .delete(`/address/${addressId}`)
        .expect(204);

      expect(Object.keys(body).length).toBeFalsy();
    });

    it('should sent a not found status if the address is not registered', async () => {
      const id = faker.datatype.number();

      await request(app.getHttpServer()).delete(`/address/${id}`).expect(404);
    });
  });

  describe('/client/{id} (PATCH)', () => {
    it('should update a registered address', async () => {
      const { id: clientId } = await prismaService.clients.create({
        data: client,
      });

      const { id: addressId } = await prismaService.addresses.create({
        data: {
          ...address,
          clientId,
        },
      });

      const { district } = address;

      const { body } = await request(app.getHttpServer())
        .patch(`/address/${addressId}`)
        .send({ district })
        .expect(200);

      expect(body).toEqual(expect.objectContaining({ district }));
    });

    it('should sent a not found status if the address is not registered', async () => {
      const id = faker.datatype.number();

      const { district } = address;

      await request(app.getHttpServer())
        .patch(`/address/${id}`)
        .send({ district })
        .expect(404);
    });
  });
});

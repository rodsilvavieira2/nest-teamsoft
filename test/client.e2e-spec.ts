import { faker } from '@faker-js/faker';
import { INestApplication } from '@nestjs/common';
import { CreateClientDto } from '@src/modules/client/dto/create-client.dto';
import { PrismaService } from '@src/modules/prisma/prisma.service';
import { clientMock } from '@src/__mocks__/@prisma/entities';

import * as request from 'supertest';
import { setUpApp } from './helpers';

describe('ClientController (e2e)', () => {
  let app: INestApplication;
  let prismaService: PrismaService;
  let client: CreateClientDto;

  const expectedErros = [
    'the cnpj property must be a CNPJ',
    'cnpj should not be empty',
    'socialReason should not be empty',
    'contactName should not be empty',
    'cellphone must be a valid phone number',
    'cellphone should not be empty',
  ];

  beforeEach(() => {
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

  describe('/client (POST)', () => {
    it('should create a new client)', async () => {
      const { body } = await request(app.getHttpServer())
        .post('/client')
        .send(client)
        .expect(201);

      expect(body).toEqual(expect.objectContaining(client));
    });

    it('should not create a client if the cnpj ir already registered', async () => {
      await prismaService.clients.create({
        data: client,
      });

      await request(app.getHttpServer())
        .post('/client')
        .send(client)
        .expect(400);
    });

    it('should not create a client if sent missing atributes', async () => {
      const { cellphone, cnpj } = client;

      await request(app.getHttpServer())
        .post('/client')
        .send({ cellphone, cnpj })
        .expect(400);
    });

    it('should not create a client if sent a invalids params', async () => {
      const { body } = await request(app.getHttpServer())
        .post('/client')
        .send({
          cellphone: '',
          contactName: '',
          socialReason: '',
          cnpj: '',
        })
        .expect(400);

      expect(body.message).toEqual(expectedErros);
    });
  });

  describe('/client/{i} (GET) ', () => {
    it('should find a registered client', async () => {
      const { cellphone, cnpj, contactName, socialReason } = client;

      const { id } = await prismaService.clients.create({
        data: {
          cellphone,
          cnpj,
          contactName,
          socialReason,
        },
      });

      const { body } = await request(app.getHttpServer())
        .get(`/client/${id}`)
        .expect(200);

      expect(body).toEqual(
        expect.objectContaining({
          cellphone,
          cnpj,
          contactName,
          socialReason,
        }),
      );
    });

    it('should sent a not found status if not found a client', async () => {
      const id = faker.datatype.number();

      await request(app.getHttpServer()).get(`/client/${id}`).expect(404);
    });
  });

  describe('/client (GET)', () => {
    it('should find all registered clients', async () => {
      const data = Array.from({ length: 2 }).map(clientMock);

      await prismaService.clients.createMany({
        data,
      });

      const { body } = await request(app.getHttpServer())
        .get(`/client`)
        .expect(200);

      expect(body).toBeTruthy();

      data.forEach((client) => {
        expect(body).toEqual(
          expect.arrayContaining([expect.objectContaining(client)]),
        );
      });
    });
  });

  describe('/client/{id} (DELETE)', () => {
    it('should delete a registered client', async () => {
      const { id } = await prismaService.clients.create({
        data: client,
      });

      const { body } = await request(app.getHttpServer())
        .delete(`/client/${id}`)
        .expect(204);

      expect(Object.keys(body).length).toBeFalsy();

      const result = await prismaService.clients.findFirst({
        where: {
          id,
        },
      });

      expect(result).toBeFalsy();
    });

    it('should sent a not found status if the client is not registered', async () => {
      const id = faker.datatype.number();

      await request(app.getHttpServer()).delete(`/client/${id}`).expect(404);
    });
  });

  describe('/client/{id} PATCH', () => {
    it('should update a registered client', async () => {
      const { id } = await prismaService.clients.create({
        data: client,
      });

      const { cnpj } = client;

      const { body } = await request(app.getHttpServer())
        .patch(`/client/${id}`)
        .send({ cnpj })
        .expect(200);

      expect(body).toEqual(expect.objectContaining({ cnpj }));
    });

    it('should not accept invalid params', async () => {
      const { id } = await prismaService.clients.create({
        data: client,
      });

      const { body } = await request(app.getHttpServer())
        .patch(`/client/${id}`)
        .send({ cnpj: '', cellphone: '', contactName: '', socialReason: '' })
        .expect(400);

      expect(body.message).toEqual(expectedErros);
    });

    it('should sent a not found status if the client is not registered', async () => {
      const id = faker.datatype.number();

      const { cnpj } = client;

      await request(app.getHttpServer())
        .patch(`/client/${id}`)
        .send({ cnpj })
        .expect(404);
    });
  });
});

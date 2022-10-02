import { ValidationPipe } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { PrismaClient } from '@prisma/client';
import { AddressModule } from '@src/modules/address/address.module';
import { ClientModule } from '@src/modules/client/client.module';
import { GoogleGeocodingService } from '@src/modules/google-geocoding/google-geocoding.service';
import { googleGeocodingServiceMock } from '@src/modules/google-geocoding/mock/google-geocoding.service.mock';
import { PrismaModule } from '@src/modules/prisma/prisma.module';
import { PrismaService } from '@src/modules/prisma/prisma.service';

const prismaClient = new PrismaClient();

export async function setUpApp() {
  const moduleFixture: TestingModule = await Test.createTestingModule({
    imports: [ClientModule, AddressModule, PrismaModule.forTest(prismaClient)],
    exports: [PrismaModule.forTest(prismaClient)],
  })
    .overrideProvider(GoogleGeocodingService)
    .useValue(googleGeocodingServiceMock)
    .compile();

  const app = moduleFixture.createNestApplication();

  app.useGlobalPipes(new ValidationPipe({ transform: true }));

  const prismaService = app.get(PrismaService);

  await app.init();

  return {
    app,
    prismaService,
  };
}

import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AddressModule } from './modules/address/address.module';
import { ClientModule } from './modules/client/client.module';
import { GoogleGeocodingService } from './modules/google-geocoding/google-geocoding.service';
import { PrismaModule } from './modules/prisma/prisma.module';

@Module({
  imports: [ClientModule, AddressModule, PrismaModule, ConfigModule.forRoot()],
  exports: [PrismaModule],
  providers: [GoogleGeocodingService],
})
export class AppModule {}

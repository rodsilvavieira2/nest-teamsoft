import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { GoogleGeocodingService } from './google-geocoding.service';

@Module({
  imports: [ConfigModule],
  providers: [GoogleGeocodingService],
  exports: [GoogleGeocodingService],
})
export class GoogleGeocodingModule {}

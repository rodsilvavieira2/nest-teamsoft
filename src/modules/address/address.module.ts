import { Module } from '@nestjs/common';
import { AddressService } from './address.service';
import { AddressController } from './address.controller';
import { GoogleGeocodingModule } from '../google-geocoding/google-geocoding.module';

@Module({
  imports: [GoogleGeocodingModule],
  controllers: [AddressController],
  providers: [AddressService],
})
export class AddressModule {}

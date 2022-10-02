import { Injectable, NotFoundException } from '@nestjs/common';
import { GoogleGeocodingService } from '../google-geocoding/google-geocoding.service';
import { PrismaService } from '../prisma/prisma.service';

import { CreateAddressDto } from './dto/create-address.dto';
import { UpdateAddressDto } from './dto/update-address.dto';

@Injectable()
export class AddressService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly googleGeocodingService: GoogleGeocodingService,
  ) {}

  async create({
    city,
    district,
    number,
    publicSpace,
    state,
    clientId,
    zipCode,
    complement,
  }: CreateAddressDto) {
    const result = await this.prisma.clients.findFirst({
      where: { id: clientId },
    });

    if (!result) {
      throw new NotFoundException('client not found');
    }

    const { lat, lng } = await this.googleGeocodingService.getCoordenantes({
      district,
      number,
      publicSpace,
      state,
      city,
      zipCode,
      complement,
    });

    return this.prisma.addresses.create({
      data: {
        city,
        district,
        number,
        publicSpace,
        state,
        zipCode,
        complement,
        clientId,
        latitude: lat,
        longitude: lng,
      },
    });
  }

  async findAll() {
    return this.prisma.addresses.findMany();
  }

  async findOne(id: number) {
    const result = await this.prisma.addresses.findFirst({
      where: {
        id,
      },
    });

    if (!result) {
      throw new NotFoundException('address not found');
    }

    return result;
  }

  async update(
    id: number,
    {
      city,
      district,
      number,
      publicSpace,
      state,
      zipCode,
      complement,
    }: UpdateAddressDto,
  ) {
    const isCreated = await this.prisma.addresses.findFirst({ where: { id } });

    if (!isCreated) {
      throw new NotFoundException('address not found');
    }

    const { lat, lng } = await this.googleGeocodingService.getCoordenantes({
      district,
      number,
      publicSpace,
      state,
      city,
      zipCode,
      complement,
    });

    return this.prisma.addresses.update({
      data: {
        city,
        district,
        number,
        publicSpace,
        state,
        zipCode,
        complement,
        latitude: lat,
        longitude: lng,
      },
      where: {
        id,
      },
    });
  }

  async remove(id: number) {
    const result = await this.prisma.addresses.findFirst({ where: { id } });

    if (!result) {
      throw new NotFoundException('address not found');
    }

    await this.prisma.addresses.delete({ where: { id } });
  }
}

import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

import { CreateClientDto } from './dto/create-client.dto';
import { UpdateClientDto } from './dto/update-client.dto';

@Injectable()
export class ClientService {
  constructor(private readonly prisma: PrismaService) {}

  async create({
    cnpj,
    cellphone,
    contactName,
    socialReason,
  }: CreateClientDto) {
    const isRegistered = await this.prisma.clients.findFirst({
      where: {
        cnpj,
      },
    });

    if (isRegistered) {
      throw new BadRequestException('CNPJ already exists');
    }

    return this.prisma.clients.create({
      data: {
        cnpj,
        cellphone,
        contactName,
        socialReason,
      },
    });
  }

  async findAll() {
    return this.prisma.clients.findMany({ include: { addresses: true } });
  }

  async findOne(id: number) {
    const result = await this.prisma.clients.findFirst({
      where: { id },
      include: { addresses: true },
    });

    if (!result) {
      throw new NotFoundException('client not found');
    }

    return result;
  }

  async update(
    id: number,
    { cellphone, cnpj, contactName, socialReason }: UpdateClientDto,
  ) {
    const result = await this.prisma.clients.findFirst({ where: { id } });

    if (!result) {
      throw new NotFoundException('client not found');
    }

    return this.prisma.clients.update({
      data: {
        cellphone,
        cnpj,
        contactName,
        socialReason,
      },
      where: {
        id,
      },
    });
  }

  async remove(id: number) {
    const result = await this.prisma.clients.findFirst({ where: { id } });

    if (!result) {
      throw new NotFoundException('client not found');
    }

    await this.prisma.clients.delete({ where: { id } });
  }
}

import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  HttpCode,
} from '@nestjs/common';
import { ClientService } from './client.service';
import { CreateClientDto } from './dto/create-client.dto';
import { UpdateClientDto } from './dto/update-client.dto';
import { ApiTags, ApiOperation, ApiResponse, ApiBody } from '@nestjs/swagger';
import { Client } from './client.entity';

@ApiTags('client')
@Controller('client')
export class ClientController {
  constructor(private readonly clientService: ClientService) {}

  @ApiOperation({ summary: 'Create a new client' })
  @ApiResponse({
    status: 201,
    type: Client,
  })
  @ApiBody({
    type: CreateClientDto,
  })
  @Post()
  async create(@Body() createClientDto: CreateClientDto) {
    return this.clientService.create(createClientDto);
  }

  @ApiOperation({
    summary: 'Get all clients record already created with they addresses.',
  })
  @ApiResponse({
    status: 200,
    type: Client,
    isArray: true,
  })
  @Get()
  async findAll() {
    return this.clientService.findAll();
  }

  @ApiOperation({
    summary: 'Find a client record.',
  })
  @ApiResponse({
    status: 200,
    type: Client,
  })
  @Get(':id')
  async findOne(@Param('id') id: number) {
    return this.clientService.findOne(id);
  }

  @ApiOperation({
    summary: 'Update a client record.',
  })
  @ApiResponse({
    status: 200,
    type: Client,
  })
  @ApiBody({
    type: CreateClientDto,
  })
  @Patch(':id')
  async update(
    @Param('id') id: number,
    @Body() updateClientDto: UpdateClientDto,
  ) {
    return this.clientService.update(id, updateClientDto);
  }

  @ApiOperation({
    summary: 'Delete a client record.',
  })
  @ApiResponse({
    status: 204,
  })
  @HttpCode(204)
  @Delete(':id')
  async remove(@Param('id') id: number) {
    return this.clientService.remove(id);
  }
}

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
import { AddressService } from './address.service';
import { CreateAddressDto } from './dto/create-address.dto';
import { UpdateAddressDto } from './dto/update-address.dto';
import { ApiTags, ApiOperation, ApiResponse, ApiBody } from '@nestjs/swagger';
import { Address } from './address.entity';

@ApiTags('Address')
@Controller('address')
export class AddressController {
  constructor(private readonly addressService: AddressService) {}

  @ApiOperation({ summary: 'Create a new address' })
  @ApiResponse({
    status: 201,
    type: Address,
  })
  @ApiBody({
    type: CreateAddressDto,
  })
  @Post()
  async create(@Body() createAddressDto: CreateAddressDto) {
    return this.addressService.create(createAddressDto);
  }

  @ApiOperation({
    summary: 'Get all addresses record already created.',
  })
  @ApiResponse({
    status: 200,
    type: Address,
    isArray: true,
  })
  @Get()
  async findAll() {
    return this.addressService.findAll();
  }

  @ApiOperation({
    summary: 'Find a address record.',
  })
  @ApiResponse({
    status: 200,
    type: Address,
  })
  @Get(':id')
  async findOne(@Param('id') id: number) {
    return this.addressService.findOne(id);
  }

  @ApiOperation({
    summary: 'Update a address record.',
  })
  @ApiResponse({
    status: 200,
    type: Address,
  })
  @Patch(':id')
  @ApiBody({
    type: CreateAddressDto,
  })
  async update(
    @Param('id') id: number,
    @Body() updateAddressDto: UpdateAddressDto,
  ) {
    return this.addressService.update(id, updateAddressDto);
  }

  @ApiOperation({
    summary: 'Delete a address record.',
  })
  @ApiResponse({
    status: 204,
  })
  @HttpCode(204)
  @Delete(':id')
  async remove(@Param('id') id: number) {
    return this.addressService.remove(id);
  }
}

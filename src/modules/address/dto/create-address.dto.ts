import {
  IsNumber,
  IsString,
  IsNotEmpty,
  MaxLength,
  IsOptional,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { faker } from '@faker-js/faker';

export class CreateAddressDto {
  @IsNotEmpty()
  @IsString()
  @MaxLength(60)
  @ApiProperty({
    example: faker.address.street(),
  })
  publicSpace: string;

  @IsOptional()
  @IsNotEmpty()
  @IsString()
  @MaxLength(60)
  @ApiProperty({
    example: faker.company.name(),
  })
  complement?: string;

  @IsString()
  @IsNotEmpty()
  @MaxLength(10)
  @ApiProperty({
    example: faker.address.buildingNumber(),
  })
  number: string;

  @IsNotEmpty()
  @IsString()
  @MaxLength(60)
  @ApiProperty({
    example: faker.address.county(),
  })
  district: string;

  @IsNotEmpty()
  @IsString()
  @MaxLength(60)
  @ApiProperty({
    example: faker.address.city(),
  })
  city: string;

  @IsNotEmpty()
  @IsString()
  @MaxLength(100)
  @ApiProperty({
    example: faker.address.state(),
  })
  state: string;

  @IsNotEmpty()
  @IsString()
  @MaxLength(18)
  @ApiProperty({
    example: faker.address.zipCode(),
  })
  zipCode: string;

  @IsNotEmpty()
  @IsNumber()
  clientId: number;
}

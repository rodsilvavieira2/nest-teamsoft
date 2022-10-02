import { faker } from '@faker-js/faker';
import { ApiProperty } from '@nestjs/swagger';

export class Address {
  @ApiProperty({
    example: 1,
  })
  id: number;

  @ApiProperty({
    example: faker.lorem.word(),
  })
  publicSpace: string;

  @ApiProperty({
    example: faker.address.buildingNumber(),
  })
  number: string;

  @ApiProperty({
    example: faker.lorem.word(),
  })
  district: string;

  @ApiProperty({
    example: faker.address.city(),
  })
  city: string;

  @ApiProperty({
    example: faker.address.state(),
  })
  state: string;

  @ApiProperty({
    example: faker.address.zipCode(),
  })
  zipCode: string;

  @ApiProperty({
    description: 'A already create client id.',
    example: 1,
  })
  clientId: number;

  @ApiProperty({ example: faker.date.future() })
  createdAt: Date;

  @ApiProperty({ example: faker.date.future() })
  updatedAt: Date;
}

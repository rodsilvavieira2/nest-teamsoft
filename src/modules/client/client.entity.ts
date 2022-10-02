import { faker } from '@faker-js/faker';
import { ApiProperty } from '@nestjs/swagger';
import { genCnpj } from '@src/__mocks__/@prisma/gen-cnpj';

export class Client {
  @ApiProperty({ example: 1 })
  id: number;

  @ApiProperty({ example: genCnpj() })
  cnpj: string;

  @ApiProperty({ example: faker.company.name() })
  socialReason: string;

  @ApiProperty({ example: faker.name.firstName() })
  contactName: string;

  @ApiProperty({ example: faker.phone.number('+55 ## 9#### ####') })
  cellphone: string;

  @ApiProperty({ example: faker.date.future() })
  createdAt: Date;

  @ApiProperty({ example: faker.date.future() })
  updatedAt: Date;
}

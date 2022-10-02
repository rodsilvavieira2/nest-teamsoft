import {
  IsString,
  IsNotEmpty,
  IsPhoneNumber,
  MaxLength,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { faker } from '@faker-js/faker';
import { genCnpj } from '@src/__mocks__/@prisma/gen-cnpj';
import { IsCnpj } from '../validators/is-cnpj';

export class CreateClientDto {
  @IsString()
  @IsNotEmpty()
  @IsCnpj()
  @MaxLength(19)
  @ApiProperty({ example: genCnpj() })
  cnpj: string;

  @IsString()
  @IsNotEmpty()
  @MaxLength(255)
  @ApiProperty({ example: faker.company.name() })
  socialReason: string;

  @IsString()
  @IsNotEmpty()
  @MaxLength(90)
  @ApiProperty({ example: faker.name.firstName() })
  contactName: string;

  @IsString()
  @IsNotEmpty()
  @IsPhoneNumber()
  @MaxLength(18)
  @ApiProperty({ example: faker.phone.number('+55 ## 9#### ####') })
  cellphone: string;
}

import { faker } from '@faker-js/faker';

import { genCnpj } from '@src/__mocks__/@prisma/gen-cnpj';
import { CreateAddressDto } from '@src/modules/address/dto/create-address.dto';
import { CreateClientDto } from '@src/modules/client/dto/create-client.dto';

export function clientMock(): CreateClientDto {
  return {
    cellphone: faker.phone.number('+55 ## 9####-####'),
    cnpj: genCnpj(),
    contactName: faker.name.fullName(),
    socialReason: faker.company.name(),
  };
}

export function addressMock(): CreateAddressDto {
  return {
    city: faker.address.city(),
    clientId: faker.datatype.number(),
    complement: faker.company.name(),
    district: faker.address.county(),
    number: faker.address.buildingNumber(),
    publicSpace: faker.address.street(),
    state: faker.address.state(),
    zipCode: faker.address.zipCode(),
  };
}

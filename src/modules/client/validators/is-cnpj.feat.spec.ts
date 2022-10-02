import { faker } from '@faker-js/faker';
import { genCnpj } from '@src/__mocks__/@prisma/gen-cnpj';
import { validate } from 'class-validator';
import { IsCnpj } from './is-cnpj';

describe('IsCnpj class validator decorator', () => {
  class Person {
    @IsCnpj()
    cnpj: string;

    constructor(cnpj: string) {
      this.cnpj = cnpj;
    }
  }

  it('should accept a valid cnpj', async () => {
    const person = new Person(genCnpj());

    const result = await validate(person);

    expect(result.length).toBe(0);
  });

  it('should no accept invalid cnpj', async () => {
    const invalidCnpj = faker.datatype.uuid();

    const person = new Person(invalidCnpj);

    const result = await validate(person);

    expect(result[0].constraints.isCnpj).toBe(
      'the cnpj property must be a CNPJ',
    );
  });
});

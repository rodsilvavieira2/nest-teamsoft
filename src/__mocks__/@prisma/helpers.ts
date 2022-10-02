import { faker } from '@faker-js/faker';

type Metadata = {
  id: number;
  createdAt: Date;
  updatedAt: Date;
};

export function withDbMetadata<T>(data: T): T & Metadata {
  return {
    ...data,
    id: faker.datatype.number(),
    createdAt: faker.date.future(),
    updatedAt: faker.date.future(),
  };
}

import { faker } from '@faker-js/faker';

const location = {
  lat: faker.datatype.number(),
  lng: faker.datatype.number(),
};

const response = {
  data: {
    results: [
      {
        geometry: {
          location,
        },
      },
    ],
  },
};

export const googleGeocodingServiceMock = {
  getCoordenantes: jest.fn().mockResolvedValue(response),
};

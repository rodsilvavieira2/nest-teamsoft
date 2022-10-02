import { faker } from '@faker-js/faker';
import { ConfigModule } from '@nestjs/config';
import { Test, TestingModule } from '@nestjs/testing';
import { addressMock } from '@src/__mocks__/@prisma/entities';
import { CreateAddressDto } from '../address/dto/create-address.dto';
import { GoogleGeocodingService } from './google-geocoding.service';
import { formateToAddressStrFeat } from './helpers/formate-to-address-str.feat';

describe('GoogleGeocodingService', () => {
  let service: GoogleGeocodingService;
  let address: CreateAddressDto;
  const GOOGLE_MAPS_API_KEY = '12345';

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        ConfigModule.forRoot({
          envFilePath: '.env.test',
        }),
      ],
      providers: [GoogleGeocodingService],
    }).compile();

    service = module.get<GoogleGeocodingService>(GoogleGeocodingService);

    address = addressMock();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should get the lat and lng by address', async () => {
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

    const client = {
      geocode: jest.fn().mockResolvedValue(response),
    };

    service.setClient(client as any);

    const addressStr = formateToAddressStrFeat(address);

    const result = await service.getCoordenantes(address);

    expect(client.geocode).toBeCalledWith({
      params: {
        key: GOOGLE_MAPS_API_KEY,
        address: addressStr,
      },
    });

    expect(result).toEqual(location);
  });

  it('should return default lat and lng values if not find the address', async () => {
    const location = {
      lat: 0,
      lng: 0,
    };

    const response = {
      data: {
        results: [],
      },
    };

    const client = {
      geocode: jest.fn().mockResolvedValue(response),
    };

    service.setClient(client as any);

    const addressStr = formateToAddressStrFeat(address);

    const result = await service.getCoordenantes(address);

    expect(client.geocode).toBeCalledWith({
      params: {
        key: GOOGLE_MAPS_API_KEY,
        address: addressStr,
      },
    });

    expect(result).toEqual(location);
  });
});

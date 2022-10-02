import { Injectable } from '@nestjs/common';
import { Client } from '@googlemaps/google-maps-services-js';
import { CreateAddressDto } from '../address/dto/create-address.dto';
import { formateToAddressStrFeat } from './helpers/formate-to-address-str.feat';
import { ConfigService } from '@nestjs/config';

type GetCoordenantesParams = Omit<CreateAddressDto, 'clientId'>;

type Response = {
  lat: number;
  lng: number;
};

@Injectable()
export class GoogleGeocodingService {
  private client: Client;

  constructor(private configService: ConfigService) {
    this.client = new Client();
  }

  setClient(client?: Client) {
    this.client = client;

    return this.client;
  }

  async getCoordenantes(props: GetCoordenantesParams): Promise<Response> {
    const address = formateToAddressStrFeat(props);

    const { data } = await this.client.geocode({
      params: {
        key: this.configService.get('GOOGLE_MAPS_API_KEY'),
        address,
      },
    });

    if (!data.results.length) {
      return {
        lat: 0,
        lng: 0,
      };
    }

    return data.results[0].geometry.location;
  }
}

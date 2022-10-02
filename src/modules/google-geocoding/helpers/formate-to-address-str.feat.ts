import { CreateAddressDto } from '@src/modules/address/dto/create-address.dto';

export function formateToAddressStrFeat({
  city,
  number,
  district,
  publicSpace,
  state,
  zipCode,
  complement,
}: Omit<CreateAddressDto, 'clientId'>): string {
  return [number, publicSpace, district, complement, city, state, zipCode]
    .filter(Boolean)
    .join(', ');
}

import { formateToAddressStrFeat } from './formate-to-address-str.feat';

describe('formateToAddressStr', () => {
  it('should create a correctly address formatted string', async () => {
    const input = {
      city: 'manaus',
      district: 'Adrianópolis',
      number: '1300',
      complement: 'shopping',
      publicSpace: 'Av. Mário Ypiranga',
      state: 'amazonas',
      zipCode: '69053-165',
    };

    const expected =
      '1300, Av. Mário Ypiranga, Adrianópolis, shopping, manaus, amazonas, 69053-165';

    expect(formateToAddressStrFeat(input)).toBe(expected);
  });
});

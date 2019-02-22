import { optionsSchema } from './HATEOAS';

describe('HATEOAS Schema', () => {
  it('shall return an object', () => {
    expect(optionsSchema.storePath).toEqual('data.options');
  });
});

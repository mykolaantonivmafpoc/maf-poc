import { campaignSchema, campaignsListSchema } from './campaignSchema';

describe('campaignSchemas ', () => {
  it('shall return an object', () => {
    expect(campaignSchema.storePath).toEqual('data.singleCampaign');
    expect(campaignsListSchema.storePath).toEqual('data.campaignList');
  });
});

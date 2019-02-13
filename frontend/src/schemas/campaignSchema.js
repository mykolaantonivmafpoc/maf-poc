import { schema } from 'normalizr';
import linksSchema from './HATEOAS';

const links = '_links';

const campaignListItemSchema = new schema.Entity('campaigns', {
  _links: linksSchema
}, {
  processStrategy: (campaign) => {
    const out = { ...campaign };
    out[links].id = `compaign-${campaign.id}`;
    return out;
  }
});

const productListSchema = new schema.Entity('product', {});

export const campaignsListSchema = {
  content: [campaignListItemSchema],
};

export const campaignSchema = {
  meta: new schema.Entity('campaigns', {}),
  content: [productListSchema]
};

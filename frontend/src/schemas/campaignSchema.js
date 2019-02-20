import { schema } from 'normalizr';
import linksSchema from './HATEOAS';

const links = '_links';
const department = new schema.Entity('department', {});
const family_category = new schema.Entity('family_category', {});
const section = new schema.Entity('section', {});
const sub_family_category = new schema.Entity('sub_family_category', {});

const campaignListItemSchema = new schema.Entity('campaigns', {
  _links: linksSchema
}, {
  processStrategy: (campaign) => {
    const out = { ...campaign };
    out[links].id = `compaign-${campaign.id}`;
    return out;
  }
});

const productListSchema = new schema.Entity('products', {}, {
  idAttribute: 'product_id'
});

export const campaignsListSchema = {
  content: [campaignListItemSchema],
  meta: {
    kpi_options: {
      department: [department],
      family_category: [family_category],
      section: [section],
      sub_family_category: [sub_family_category]
    }
  }
};

export const campaignSchema = {
  meta: new schema.Entity('campaigns', {
    kpi_options: {
      department: [department],
      family_category: [family_category],
      section: [section],
      sub_family_category: [sub_family_category]
    }
  }),
  content: [productListSchema]
};

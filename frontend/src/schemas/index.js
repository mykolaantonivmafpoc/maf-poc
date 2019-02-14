import { campaignSchema, campaignsListSchema } from './campaignSchema';
import { optionsSchema } from './HATEOAS';

const Schemas = {
  CAMPAIGN: campaignSchema,
  CAMPAIGN_LIST: campaignsListSchema,
  OPTIONS_LIST: optionsSchema
};

export default Schemas;

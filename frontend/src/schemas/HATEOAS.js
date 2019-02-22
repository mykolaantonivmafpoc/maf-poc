import { schema } from 'normalizr';

const linksSchema = new schema.Entity('links');

export const optionsSchema = new schema.Entity('options', {
  _links: linksSchema
}, {
  processStrategy: (campaign) => {
    return campaign;
  }
});
optionsSchema.storePath = 'data.options';
export default linksSchema;

import { schema } from 'normalizr';

const linksSchema = new schema.Entity('links');

export const optionsSchema = new schema.Entity('links', new schema.Values(), {
  idAttribute: () => ([-1]),
  // processStrategy: (entity) => ({
  //   ...entity,
  //   options: -1
  // })
});
export default linksSchema;

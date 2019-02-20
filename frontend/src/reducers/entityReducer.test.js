import { merge } from 'lodash';
import entities from './entityReducer';
import * as HATEOASConstants from '../constants/HATEOASConstants';

describe('Entities reducer', () => {
  it('should test entities with empty objects', () => {
    const state = {
      campaigns: {},
      links: {}
    };
    const action = {};
    const res = entities(state, action);
    expect(res).toEqual(state);
  });

  it('should test entities with data', () => {
    const state = {
      campaigns: {},
      links: {}
    };

    const action = {
      response: {
        entities: {
          links: {
            '-1': { Campaigns: '/v1/Campaigns/' }
          }
        },
        result: [-1]
      },
      type: HATEOASConstants.GETOPTIONS_SUCCESS
    };
    const res = entities(state, action);
    const sameRes = merge({}, state, action.response.entities);
    expect(res).toEqual(sameRes);
  });
});

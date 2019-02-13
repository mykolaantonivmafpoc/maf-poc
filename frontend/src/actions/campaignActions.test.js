import { loadAllCampaigns, loadCampaign } from './campaignActions';
import { CALL_API } from '../middleware/hateoasApi';
import Schemas from '../schemas';

describe('Campaign actions', () => {
  it('generates a proper action for all camapigns', () => {
    const dispatch = jest.fn(data => data);
    const fn = loadAllCampaigns();
    fn(dispatch);
    const action = dispatch.mock.results[0].value;

    expect(dispatch.mock.calls.length).toBe(1);
    expect(action).toHaveProperty(CALL_API);
    expect(action[CALL_API]).toHaveProperty('endpoint');
    expect(action[CALL_API].schema).toEqual(Schemas.CAMPAIGN_LIST);
  });
  it('generates a proper action for a single camapign', () => {
    const dispatch = jest.fn(data => data);
    const getState = jest.fn(() => ({
      entities: {
        campaigns: {
          1: {
            _links: 'campaign-1'
          }
        }
      }
    })
    );
    const fn = loadCampaign(1);
    fn(dispatch, getState);
    const action = dispatch.mock.results[0].value;

    expect(dispatch.mock.calls.length).toBe(1);
    expect(action).toHaveProperty(CALL_API);
    expect(action[CALL_API]).toHaveProperty('endpoint');
    expect(action[CALL_API].endpoint).toEqual({
      key: 'campaign-1',
      rel: 'self'
    });
    expect(action[CALL_API].schema).toEqual(Schemas.CAMPAIGN);
  });
});

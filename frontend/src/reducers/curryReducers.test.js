import curryReducers from './curryReducers';
import * as campaignConstants from '../constants/campaignConstants';
import * as HATEOASConstants from '../constants/HATEOASConstants';

const campaignConstantTypes = [
  campaignConstants.GETONE_REQUEST,
  campaignConstants.GETONE_SUCCESS,
  campaignConstants.GETONE_FAILURE
];

const HATEOASConstantsTypes = [
  HATEOASConstants.GETOPTIONS_REQUEST,
  HATEOASConstants.GETOPTIONS_SUCCESS,
  HATEOASConstants.GETOPTIONS_FAILURE
];

describe('curry reducer', () => {
  it('should test the singleCampaign', () => {
    const singleCampaign = {
      key: 'campaigns',
      types: campaignConstantTypes
    };
    const action = {
      type: campaignConstants.GETONE_REQUEST
    };
    const curryReducer = curryReducers(singleCampaign);
    const testCurryReducer = curryReducer({}, action);
    expect(testCurryReducer).toEqual({ isFetching: true });
  });

  it('should test the options with GETOPTIONS_REQUEST', () => {
    const options = {
      key: 'links',
      types: HATEOASConstantsTypes
    };
    const action = {
      type: HATEOASConstants.GETOPTIONS_REQUEST
    };
    const curryReducer = curryReducers(options);
    const testCurryReducer = curryReducer({}, action);
    expect(testCurryReducer).toEqual({ isFetching: true });
  });

  it('should throw error', () => {
    const action = {
      key: 100,
      types: [
        HATEOASConstants.GETOPTIONS_REQUEST,
        HATEOASConstants.GETOPTIONS_SUCCESS,
        HATEOASConstants.GETOPTIONS_FAILURE
      ]
    };
    expect(curryReducers(action)).toThrow();
  });
});

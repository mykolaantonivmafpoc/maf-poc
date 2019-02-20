import genericReducer from './genericReducer';
import * as campaignConstants from '../constants/campaignConstants';

describe('Generic reducer', () => {
  it('should test GETALL_REQUEST', () => {
    const action = {
      type: campaignConstants.GETALL_REQUEST,
      types: [
        campaignConstants.GETALL_REQUEST,
        campaignConstants.GETALL_SUCCESS,
        campaignConstants.GETALL_FAILURE
      ]
    };

    expect(genericReducer({}, action)).toEqual({ isFetching: true });
  });

  it('should test GETALL_SUCCESS', () => {
    const action = {
      type: campaignConstants.GETALL_SUCCESS,
      types: [
        campaignConstants.GETALL_REQUEST,
        campaignConstants.GETALL_SUCCESS,
        campaignConstants.GETALL_FAILURE
      ],
      response: {
        result: {
          content: [1220565, 1512204, 1215779, 1235910, 1504709, 1345539, 504956, 1313847, 307162],
          meta: 1
        }
      }
    };
    const state = {
      isFetching: true
    };
    expect(genericReducer({}, action))
      .toEqual({ ...state, isFetching: false, ...action.response.result });
  });

  it('should test GETALL_FAILURE', () => {
    const action = {
      type: campaignConstants.GETALL_FAILURE,
      types: [
        campaignConstants.GETALL_REQUEST,
        campaignConstants.GETALL_SUCCESS,
        campaignConstants.GETALL_FAILURE
      ],
      response: {
        result: {
          content: [1220565, 1512204, 1215779, 1235910, 1504709, 1345539, 504956, 1313847, 307162],
          meta: 1
        }
      }
    };
    const state = {
      isFetching: true
    };

    expect(genericReducer({}, action)).toEqual({ ...state, isFetching: false });
  });
});

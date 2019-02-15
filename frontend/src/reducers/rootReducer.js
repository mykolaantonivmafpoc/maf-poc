import merge from 'lodash/merge';
import { combineReducers } from 'redux';
import login from './loginReducer';
import navigation from './navigationReducer';

import * as campaignConstants from '../constants/campaignConstants';
import * as HATEOASConstants from '../constants/HATEOASConstants';

const entities = (state = { campaigns: {}, links: {} }, action) => {
  let out = Object.assign({}, state);
  if (action.response && action.response.entities) {
    out = merge({}, state, action.response.entities);
  }

  return out;
};

const genericReducer = (state = {}, action) => {
  const [requestType, successType, failureType] = action.types;

  switch (action.type) {
    case requestType:
      return {
        isFetching: true
      };
    case successType:
      return {
        ...state,
        isFetching: false,
        ...action.response.result
      };
    case failureType:
      return {
        ...state,
        isFetching: false
      };
    default:
      return state;
  }
};

const curryReducers = ({ key, types }) => {
  return (state = {}, action) => {
    const [requestType, successType, failureType] = types;
    const act = { ...action, key, types };

    // Update pagination by key
    switch (action.type) {
      case requestType:
      case successType:
      case failureType:
        // const key = mapActionToKey(action)
        if (typeof key !== 'string') {
          throw new Error('Expected key to be a string.');
        }
        return {
          ...state,
          ...genericReducer(state, act)
        };
      default:
        return state;
    }
  };
};

const rootReducer = combineReducers({
  data: combineReducers({
    singleCampaign: curryReducers({
      key: 'campaigns',
      types: [
        campaignConstants.GETONE_REQUEST,
        campaignConstants.GETONE_SUCCESS,
        campaignConstants.GETONE_FAILURE
      ]
    }),
    campaignList: curryReducers({
      key: 'campaigns',
      types: [
        campaignConstants.GETALL_REQUEST,
        campaignConstants.GETALL_SUCCESS,
        campaignConstants.GETALL_FAILURE
      ]
    }),
    options: curryReducers({
      key: 'links',
      types: [
        HATEOASConstants.GETOPTIONS_REQUEST,
        HATEOASConstants.GETOPTIONS_SUCCESS,
        HATEOASConstants.GETOPTIONS_FAILURE
      ]
    }),
  }),
  entities,
  login,
  navigation
});

export default rootReducer;

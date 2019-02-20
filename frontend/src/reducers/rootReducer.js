
import { combineReducers } from 'redux';
import login from './loginReducer';
import navigation from './navigationReducer';
import curryReducers from './curryReducers';
import entities from './entityReducer';
import * as campaignConstants from '../constants/campaignConstants';
import * as HATEOASConstants from '../constants/HATEOASConstants';

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

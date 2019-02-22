import { createAction, nestActions } from '../middleware/HATEOASApi';
import { fetchRoot } from './HATEOASActions';
import Schemas from '../schemas';

import {
  GETALL_REQUEST,
  GETALL_SUCCESS,
  GETALL_FAILURE,

  GETONE_REQUEST,
  GETONE_SUCCESS,
  GETONE_FAILURE
} from '../constants/campaignConstants';

const fetchList = filter => {
  return (createAction({
    requestType: GETALL_REQUEST,
    successType: GETALL_SUCCESS,
    failureType: GETALL_FAILURE,
    endpoint: {
      key: 'Campaigns'
    },
    schema: Schemas.CAMPAIGN_LIST,
    payload: filter
  }));
};

const fetchSingle = ({ filter, endpoint }) => {
  return (createAction({
    requestType: GETONE_REQUEST,
    successType: GETONE_SUCCESS,
    failureType: GETONE_FAILURE,
    endpoint,
    schema: Schemas.CAMPAIGN,
    payload: filter
  }));
};

const nestedList = (filter) => nestActions(fetchRoot, fetchList)({}, filter);
const nestedSingle = (filter, endpoint) => nestActions(
  nestedList,
  fetchSingle
)(filter, { filter, endpoint });

export const loadAllCampaigns = (filter) => (dispatch) => {
  return dispatch(nestedList(filter));
};

export const loadCampaign = (filter, id) => (dispatch) => {
  // const campaign = getState().entities.campaigns[id];
  // const links = '_links';

  return dispatch(nestedSingle(filter, { key: `campaign-${id}`, rel: 'self' }));
};

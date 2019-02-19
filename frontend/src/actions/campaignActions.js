import { CALL_API, packTypes } from '../middleware/hateoasApi';
import Schemas from '../schemas';

import {
  GETALL_REQUEST,
  GETALL_SUCCESS,
  GETALL_FAILURE,

  GETONE_REQUEST,
  GETONE_SUCCESS,
  GETONE_FAILURE
} from '../constants/campaignConstants';

const fetchAll = filter => ({
  [CALL_API]: {
    types: packTypes(GETALL_REQUEST, GETALL_SUCCESS, GETALL_FAILURE),
    endpoint: {
      key: -1,
      rel: 'Campaigns'
    },
    schema: Schemas.CAMPAIGN_LIST,
    filter
  }
});

const fetchSingle = (endpoint, filter) => ({
  [CALL_API]: {
    types: packTypes(GETONE_REQUEST, GETONE_SUCCESS, GETONE_FAILURE),
    schema: Schemas.CAMPAIGN,
    endpoint,
    filter
  }
});

export const loadAllCampaigns = (filter) => (dispatch) => {
  return dispatch(fetchAll(filter));
};

export const loadCampaign = (id, filter) => (dispatch, getState) => {
  const campaign = getState().entities.campaigns[id];
  const links = '_links';

  return dispatch(fetchSingle({
    key: campaign[links],
    rel: 'self'
  }, filter));
};

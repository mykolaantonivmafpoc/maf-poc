import { CALL_API, packTypes } from '../middleware/hateoasApi';
import Schemas from '../schemas';
import {
  API_PATH
} from '../config';

import {
  GETALL_REQUEST,
  GETALL_SUCCESS,
  GETALL_FAILURE,

  GETONE_REQUEST,
  GETONE_SUCCESS,
  GETONE_FAILURE
} from '../constants/campaignConstants';

const fetchAll = () => ({
  [CALL_API]: {
    types: packTypes(GETALL_REQUEST, GETALL_SUCCESS, GETALL_FAILURE),
    endpoint: `${API_PATH}Campaign`,
    schema: Schemas.CAMPAIGN_LIST
  }
});

const fetchSingle = endpoint => ({
  [CALL_API]: {
    types: packTypes(GETONE_REQUEST, GETONE_SUCCESS, GETONE_FAILURE),
    endpoint,
    schema: Schemas.CAMPAIGN
  }
});

export const loadAllCampaigns = () => (dispatch) => {
  return dispatch(fetchAll());
};

export const loadCampaign = (id) => (dispatch, getState) => {
  const campaign = getState().entities.campaigns[id];
  const links = '_links';

  return dispatch(fetchSingle({
    key: campaign[links],
    rel: 'self'
  }));
};

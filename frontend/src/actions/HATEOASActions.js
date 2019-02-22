import { createAction } from '../middleware/HATEOASApi';
import Schemas from '../schemas';
import {
  API_PATH
} from '../config';
import {
  GETOPTIONS_REQUEST,
  GETOPTIONS_SUCCESS,
  GETOPTIONS_FAILURE
} from '../constants/HATEOASConstants';

export const fetchRoot = () => {
  return createAction({
    requestType: GETOPTIONS_REQUEST,
    successType: GETOPTIONS_SUCCESS,
    failureType: GETOPTIONS_FAILURE,
    endpoint: API_PATH,
    schema: Schemas.OPTIONS_LIST
  });
};

export default (dispatch) => {
  return dispatch(fetchRoot());
};

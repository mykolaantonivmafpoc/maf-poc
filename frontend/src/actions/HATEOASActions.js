import { CALL_API, packTypes } from '../middleware/hateoasApi';
import Schemas from '../schemas';
import {
  API_PATH
} from '../config';
import {
  GETOPTIONS_REQUEST,
  GETOPTIONS_SUCCESS,
  GETOPTIONS_FAILURE
} from '../constants/HATEOASConstants';

const fetchAll = () => ({
  [CALL_API]: {
    types: packTypes(GETOPTIONS_REQUEST, GETOPTIONS_SUCCESS, GETOPTIONS_FAILURE),
    endpoint: API_PATH,
    schema: Schemas.OPTIONS_LIST
  }
});

export default (dispatch) => {
  return dispatch(fetchAll());
};

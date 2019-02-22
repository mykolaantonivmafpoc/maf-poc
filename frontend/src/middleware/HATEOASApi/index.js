import createHATEOASAction from './createAction';
import nestHATEOASActions from './nestActions';
import { packTypes as pt } from './utils';
import HATEOASApi from './hateoasApi';

// Action key that carries API call info interpreted by this Redux middleware.
export const CALL_API = 'HATEOAS_API_CALL';

export const createAction = createHATEOASAction;
export const nestActions = nestHATEOASActions;

export const packTypes = pt;

export default HATEOASApi;

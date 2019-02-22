import { CALL_API } from './index';
import { packTypes } from './utils';

const createHaluxAction = ({
  endpoint,
  schema,
  payload,
  requestType,
  successType,
  failureType
}) => ({
  [CALL_API]: {
    types: packTypes(requestType, successType, failureType),
    endpoint,
    schema,
    payload
  }
});

export default createHaluxAction;

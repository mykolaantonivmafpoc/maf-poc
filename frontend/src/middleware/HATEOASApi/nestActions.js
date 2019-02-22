import { CALL_API } from './index';

const nestHaluxActions = (parent, child) => {
  return (...args) => ({
    [CALL_API]: [
      ...[].concat(parent(...args.slice(0, -1))[CALL_API]),
      child(...args.slice(-1))[CALL_API]
    ]
  });
};

export default nestHaluxActions;

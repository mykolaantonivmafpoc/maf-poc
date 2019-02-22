import SET_FILTER from '../constants/filterConstants';
import filter from './filterReducer';

describe('navigation reducer', () => {
  it('should return the default state', () => {
    const action = {
      type: SET_FILTER
    };

    expect(filter({}, action)).toBeUndefined();
  });
  it('should return state with filters applied', () => {
    const action = {
      type: SET_FILTER,
      payload: 'Some data'
    };

    expect(filter({}, action)).toEqual('Some data');
  });
});

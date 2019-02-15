import navigation from './navigationReducer';
import * as constants from '../constants/navigationConstants';

describe('navigation reducer', () => {
  it('should return the default state', () => {
    const action = {
      type: undefined
    };

    expect(navigation({}, action)).toEqual({ });
  });

  it('should handle SHOW_FILTER', () => {
    const action = {
      type: constants.SHOW_FILTER
    };

    expect(navigation({}, action)).toEqual({ filterShown: true });
  });

  it('should handle HIDE_FILTER', () => {
    const action = {
      type: constants.HIDE_FILTER
    };

    expect(navigation({}, action)).toEqual({ filterShown: false });
  });

  it('should handle SHOW_MAIN_NAV', () => {
    const action = {
      type: constants.SHOW_MAIN_NAV
    };

    expect(navigation({}, action)).toEqual({ navShown: true });
  });

  it('should handle HIDE_MAIN_NAV', () => {
    const action = {
      type: constants.HIDE_MAIN_NAV
    };

    expect(navigation({}, action)).toEqual({ navShown: undefined });
  });

  it('should handle REMOVE_MAIN_NAV', () => {
    const action = {
      type: constants.REMOVE_MAIN_NAV
    };

    expect(navigation({}, action)).toEqual({ navShown: false });
  });
});

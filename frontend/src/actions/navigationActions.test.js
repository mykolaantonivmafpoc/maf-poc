import * as navigationActions from './navigationActions';
import * as constants from '../constants/navigationConstants';

const dispatch = jest.fn(input => input);

describe('showFilter', () => {
  it('should show the filter successfully', () => {
    const filter = {
      filterShown: true,
      navShown: true
    };
    const func = navigationActions.showFitler(filter);
    const action = func(dispatch);

    expect(action.type).toEqual(constants.SHOW_FILTER);
    expect(dispatch).toHaveBeenCalled();
  });

  it('should hide the filter successfully', () => {
    const filter = {
      filterShown: false,
      navShown: true
    };
    const func = navigationActions.hideFilter(filter);
    const action = func(dispatch);

    expect(action.type).toEqual(constants.HIDE_FILTER);
    expect(dispatch).toHaveBeenCalled();
  });

  it('should show the mainNav successfully', () => {
    const mainNav = {
      navShown: true
    };
    const func = navigationActions.showMainNav(mainNav);
    const action = func(dispatch);

    expect(action.type).toEqual(constants.SHOW_MAIN_NAV);
    expect(dispatch).toHaveBeenCalled();
  });

  it('should hide the mainNav successfully', () => {
    const mainNav = {
      navShown: false
    };
    const func = navigationActions.hideMainNav(mainNav);
    const action = func(dispatch);

    expect(action.type).toEqual(constants.HIDE_MAIN_NAV);
    expect(dispatch).toHaveBeenCalled();
  });
});

import React from 'react';
import { mount } from 'enzyme';
import { MemoryRouter, Route } from 'react-router-dom';

import MobileNav from './MobileNav';

describe('MobileNav Component', () => {
  let wrapper;
  let props;

  beforeEach(() => {
    props = {
      hideFilter: jest.fn(),
      showFitler: jest.fn(),
      removeMainNav: jest.fn(),
      showMainNav: jest.fn(),
      hideMainNav: jest.fn()
    };

    wrapper = mount(
      <MemoryRouter>
        <Route>
          <MobileNav {...props} />
        </Route>
      </MemoryRouter>
    );
  });

  it('Should render  MobileNav element without throwing an error.', () => {
    expect(wrapper.find('.mobile-nav-wrapper')).toHaveLength(1);
  });

  it('Should call correct functions on large resolution', () => {
    wrapper.find('MobileNav').instance().onWindowResize(2000);
    wrapper.update();
    expect(props.showFitler.mock.calls.length).toBe(1);
    expect(props.hideMainNav.mock.calls.length).toBe(1);
  });

  it('Should call correct functions on small resolution', () => {
    const hideFilterCount = props.hideFilter.mock.calls.length;
    const removeMainNavCount = props.removeMainNav.mock.calls.length;

    wrapper.find('MobileNav').instance().onWindowResize(800);
    wrapper.update();
    expect(props.hideFilter.mock.calls.length).toBe((hideFilterCount + 1));
    expect(props.removeMainNav.mock.calls.length).toBe((removeMainNavCount + 1));
  });

  it('Should debounce correctly', (done) => {
    const navInstance = wrapper.find('MobileNav').instance();
    const callBack = jest.fn(() => {});

    navInstance.DEBOUNCE_TIME = 1;
    navInstance.debounceWindowResize(100, callBack);
    navInstance.debounceWindowResize(100, callBack);
    navInstance.debounceWindowResize(100, callBack);

    setTimeout(() => {
      expect(callBack.mock.calls.length).toBe(1);
      done();
    }, 2);
  });
});

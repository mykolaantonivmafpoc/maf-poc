import React from 'react';
import { shallow } from 'enzyme';

import MainNav from './MainNav';

describe('Filter Component', () => {
  const props = {
    removeMainNav: jest.fn(),
    showMainNav: jest.fn(),
    hideMainNav: jest.fn(),
    navShown: false
  };
  const wrapper = shallow(<MainNav {...props}/>);

  it('should render MainNav component without throwing an error', () => {
    expect(wrapper.find('.filters-wrapper')).toBeTruthy();
  });
});

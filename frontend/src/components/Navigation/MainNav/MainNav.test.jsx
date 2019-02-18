import React from 'react';
import { shallow } from 'enzyme';

import MainNav from './MainNav';

describe('Main Nav Component', () => {
  const props = {
    removeMainNav: jest.fn(),
    showMainNav: jest.fn(),
    hideMainNav: jest.fn(),
    navShown: false,
    logout: jest.fn()
  };
  const wrapper = shallow(<MainNav {...props}/>);

  it('should render MainNav component without throwing an error', () => {
    expect(wrapper.find('aside')).toBeTruthy();
  });
});

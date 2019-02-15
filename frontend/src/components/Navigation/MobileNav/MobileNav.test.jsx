import React from 'react';
import { shallow } from 'enzyme';

import MobileNav from './MobileNav';

describe('MobileNav Component', () => {
  const props = {
    hideFilter: jest.fn(),
    showFitler: jest.fn(),
    removeMainNav: jest.fn(),
    showMainNav: jest.fn(),
    hideMainNav: jest.fn()
  };
  const wrapper = shallow(<MobileNav {...props} />);

  it('should render  MobileNav element without throwing an error.', () => {
    expect(wrapper.find('.mobile-nav-wrapper')).toHaveLength(1);
  });
});

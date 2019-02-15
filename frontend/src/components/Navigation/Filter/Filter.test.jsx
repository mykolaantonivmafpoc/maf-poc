import React from 'react';
import { shallow } from 'enzyme';

import Filter from './Filter';

describe('Filter Component', () => {
  const props = { hideFilter: jest.fn() };
  const wrapper = shallow(<Filter {...props}/>);

  it('should render the form without throwing an error', () => {
    expect(wrapper.find('.filters-wrapper')).toBeTruthy();
  });
});

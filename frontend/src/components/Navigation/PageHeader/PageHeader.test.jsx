import React from 'react';
import { shallow } from 'enzyme';

import PageHeader from './PageHeader';

describe('Page Header Component', () => {
  const wrapper = shallow(<PageHeader />);

  it('should render the form without throwing an error', () => {
    expect(wrapper.find('.page-header')).toBeTruthy();
  });
});

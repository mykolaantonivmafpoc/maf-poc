import React from 'react';
import { mount } from 'enzyme';
import App from './App';

describe('Login Component', () => {
  const wrapper = mount(<App />);

  it('should render the form without throwing an error', () => {
    expect(wrapper.find('.root')).toHaveLength(1);
  });
});

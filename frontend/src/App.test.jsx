import React from 'react';
import { shallow } from 'enzyme';
import App from './App';

describe('Login Component', () => {
  const wrapper = shallow(<App />);

  it('should render the form without throwing an error', () => {
    expect(wrapper.find('div')).toBeTruthy();
  });
});

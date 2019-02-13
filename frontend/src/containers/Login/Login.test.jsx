import React from 'react';
import { Provider } from 'react-redux';
import { mount } from 'enzyme';
import configureStore from 'redux-mock-store';
import Login from './Login';

describe('Login Component', () => {
  const mockProps = {
    authenticate: jest.fn(),
    location: {
      state: { from: {} }
    }
  };
  const mockStore = configureStore();
  let store;
  let wrapper;

  beforeEach(() => {
    store = mockStore(mockProps);
    wrapper = mount(<Provider store={store}><Login {...mockProps}/></Provider>);
  });

  it('should render the form without throwing an error', () => {
    expect(wrapper.find('form.form-signin')).toBeTruthy();
  });
});

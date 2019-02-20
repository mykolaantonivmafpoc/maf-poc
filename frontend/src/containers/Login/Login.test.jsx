import React from 'react';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import { mount } from 'enzyme';
import configureStore from 'redux-mock-store';

import Login from './Login';
import HATEOASApi from '../../middleware/hateoasApi';
import {
  LOGIN_SUCCESS,
  LOGIN_FAILURE
} from '../../constants/userConstants';

describe('Login Component', () => {
  const mockProps = {
    authenticate: jest.fn(),
    location: {
      state: { from: {} }
    },
    login: {}
  };
  const mockStore = configureStore([thunk, HATEOASApi]);
  let store;
  let wrapper;
  let loginComponent;

  beforeEach(() => {
    store = mockStore(mockProps);
    wrapper = mount(<Provider store={store}><Login {...mockProps}/></Provider>);
    loginComponent = wrapper.find('Login').instance();
  });

  it('should render the form without throwing an error', () => {
    expect(wrapper.find('form.form-signin')).toHaveLength(1);
  });

  it('should render three imput fields and a button on the page', () => {
    expect(wrapper.find('input')).toHaveLength(3);
    expect(wrapper.find('button.btn')).toHaveLength(1);
  });

  it('simulate change of username & password inputs, and change state accordingly', () => {
    const eventUsername = {
      target: { name: 'username', value: 'fakeUser' }
    };
    const eventPassword = {
      target: { name: 'password', value: '123456' }
    };

    wrapper.find('input[name="username"]').simulate('change', eventUsername);
    wrapper.find('input[name="password"]').simulate('change', eventPassword);

    expect(wrapper.find('input[name="username"]').prop('value')).toEqual('fakeUser');
    expect(loginComponent.state.username).toEqual('fakeUser');
    expect(wrapper.find('input[name="password"]').prop('value')).toEqual('123456');
    expect(loginComponent.state.password).toEqual('123456');
  });

  it('simulate change of username & password inputs, and change state accordingly', () => {
    const eventUsername = {
      target: { name: 'username', value: 'fakeUser' }
    };
    const eventPassword = {
      target: { name: 'password', value: '123456' }
    };

    wrapper.find('input[name="username"]').simulate('change', eventUsername);
    wrapper.find('input[name="password"]').simulate('change', eventPassword);

    expect(wrapper.find('input[name="username"]').prop('value')).toEqual('fakeUser');
    expect(loginComponent.state.username).toEqual('fakeUser');
    expect(wrapper.find('input[name="password"]').prop('value')).toEqual('123456');
    expect(loginComponent.state.password).toEqual('123456');
  });

  /* Testign integration with Redux actions */
  it('simulate submitting the form with wrong data --> login failure', () => {
    loginComponent.setState({ username: 'fakeUser', password: '123456' });
    wrapper.find('form.form-signin').simulate('submit', { preventDefault: jest.fn() });
    const actions = store.getActions();
    const expectedPayload = { type: LOGIN_FAILURE, response: new Error('The login/password combination is not valid') };
    expect(actions).toEqual([expectedPayload]);
  });

  it('simulate submitting the form with correct data --> login success', () => {
    loginComponent.setState({ username: 'apiuser', password: 'apipass' });
    wrapper.find('form.form-signin').simulate('submit', { preventDefault: jest.fn() });
    const actions = store.getActions();
    const expectedPayloadType = LOGIN_SUCCESS;
    expect(actions[0].type).toEqual(expectedPayloadType);
  });
});

import React from 'react';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import { mount } from 'enzyme';
import { shape } from 'prop-types';

import NavWrapper from './NavWrapper';

describe('NavWrapper Component', () => {
  const mockProps = {
    navigation: {},
    data: {
      singleCampaign: {
        content: [1, 2, 3, 4],
        meta: {}
      },
      campaignList: {},
      options: {}
    },
    entities: {},
    kpi_options: {},
    children: [],
    hideFilter: jest.fn(),
    showFitler: jest.fn(),
    showMainNav: jest.fn(),
    removeMainNav: jest.fn(),
    hideMainNav: jest.fn(),
    loadCampaign: jest.fn(),
    logout: jest.fn()
  };

  const options = {
    context: {
      router: {
        history: {
          push: jest.fn(),
          replace: jest.fn(),
          createHref: jest.fn()
        },
        route: {
          location: {
            hash: '',
            pathname: '',
            search: '',
            state: ''
          },
          match: {
            params: {},
            isExact: false,
            path: '',
            url: ''
          }
        }
      }
    },
    childContextTypes: {
      router: shape({
        route: shape({
          location: shape({}),
          match: shape({})
        }),
        history: shape({})
      })
    }
  };

  let store;
  let wrapper;

  const mockStore = configureStore(mockProps);

  beforeEach(() => {
    store = mockStore(mockProps);
    wrapper = mount(
      <Provider store={store}>
        <NavWrapper {...mockProps} />
      </Provider>,
      options
    );
  });

  it('Render NavWrapper component', () => {
    expect(wrapper.find('NavWrapper')).toBeDefined();
  });
});

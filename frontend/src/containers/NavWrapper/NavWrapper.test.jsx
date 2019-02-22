import React from 'react';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import { mount } from 'enzyme';
import { shape } from 'prop-types';
import thunk from 'redux-thunk';

import HATEOASApi from '../../middleware/HATEOASApi';
import NavWrapper from './NavWrapper';

describe('NavWrapper Component', () => {
  const loadAllCampaigns = jest.fn();
  const loadCampaign = jest.fn();

  jest.mock('../../actions/campaignActions');
  const mockProps = {
    navigation: { filterShown: true },
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
    loadCampaign,
    loadAllCampaigns,
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

  const mockStore = configureStore([thunk, HATEOASApi]);
  const instanceProps = { ...mockProps, match: { path: '/campaigns' }, loadAllCampaigns, loadCampaign };

  beforeEach(() => {
    store = mockStore(mockProps);
    wrapper = mount(
      <Provider store={store}>
        <NavWrapper {...instanceProps} />
      </Provider>,
      options
    );
  });

  it('render correctly on Desktop resolutions: NavWrap and MainNav are shown', () => {
    expect(wrapper.find('NavWrapper')).toBeDefined();
    expect(wrapper.find('MainNav')).toHaveLength(1);
    expect(wrapper.find('MobileNav')).toHaveLength(1);
  });
});

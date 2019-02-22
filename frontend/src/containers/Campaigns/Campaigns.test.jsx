import React from 'react';
import { mount } from 'enzyme';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import { Route, MemoryRouter } from 'react-router-dom';
import thunk from 'redux-thunk';

import HATEOASApi from '../../middleware/HATEOASApi';
import Campaigns from './Campaigns';

describe('Campaigns Component', () => {
  const mockCampaignsList = {
    1: {
      campaign_type: 'NATIONAL',
      cost_price: 462.48,
      date_from: 'Thu, 08 Feb 2018 00:00:00 GMT',
      date_to: 'Thu, 22 Mar 2018 00:00:00 GMT',
      description: 'Campaign A',
      id: 1,
      incr_basket: 0.287,
      incr_basket_per: 0,
      incr_margin: 103620.97445,
      incr_sales: 1155624.556,
      incr_sales_per: 130.7243,
      incr_traffic: 9986.0652,
      incr_traffic_per: 0,
      incr_tse: 6709290.1173,
      incr_tse_per: 0,
      ipromo_depth: 2.8568,
      name: 'Campaign A',
      promo_price: 136.5,
      slash_price: 192.27,
      total_sales: 3067185.5446,
      volume_sold: 282200.16,
      _links: 'compaign-1'
    },
    2: {
      campaign_type: 'NATIONAL',
      cost_price: 159.531,
      date_from: 'Sun, 10 Jul 2016 00:00:00 GMT',
      date_to: 'Sun, 16 Oct 2016 00:00:00 GMT',
      description: 'Campaign A',
      id: 2,
      incr_basket: 0.4612,
      incr_basket_per: 0,
      incr_margin: -60699.05035,
      incr_sales: 1491064.16975,
      incr_sales_per: 228.9872,
      incr_traffic: 11240.2674,
      incr_traffic_per: 0,
      incr_tse: 6912915.71,
      incr_tse_per: 0,
      ipromo_depth: 4.8129,
      name: 'Campaign B',
      promo_price: 162.75,
      slash_price: 259.794,
      total_sales: 3559413.78,
      volume_sold: 394543.93,
      _links: 'compaign-2'
    },
  };

  const mockProps = {
    history: {},
    entities: {
      campaigns: { ...mockCampaignsList },
      links: {
        '-1': {
          Campaigns: '/v1/Campaigns/'
        },
        'compaign-1': {
          collection: '/v1/Campaigns/',
          self: '/v1/Campaign/1/',
          id: 'compaign-1'
        },
        'compaign-2': {
          collection: '/v1/Campaigns/',
          self: '/v1/Campaign/2/',
          id: 'compaign-2'
        }
      }
    },
    data: {
      singleCampaign: {},
      options: {
        0: -1,
        isFetching: true
      },
      campaignList: {
        isFetching: true,
        content: [1, 2],
        meta: { type: 'Campaigns' },
        _links: { self: 'asdf' }
      }
    },
    navigation: {
      filterShown: true
    }
  };

  const mockStore = configureStore([thunk, HATEOASApi]);
  let store;
  let wrapper;

  beforeEach(() => {
    store = mockStore(mockProps);
    wrapper = mount(
      <Provider store={store}>
        <MemoryRouter>
          <Route>
            <Campaigns {...mockProps}/>
          </Route>
        </MemoryRouter>
      </Provider>
    );
  });

  it('should render the Campaigns component and its children without throwing an error', () => {
    expect(wrapper.find('Campaigns')).toHaveLength(1);
    expect(wrapper.find('NavWrapper')).toHaveLength(1);
    expect(wrapper.find('PageHeader')).toHaveLength(1);
    expect(wrapper.find('DataGrid')).toHaveLength(1);
  });

  it('should render render a table with two rows', () => {
    const dataGrid = (wrapper.find('DataGrid'));
    expect(dataGrid.find('.cell-campaign')).toHaveLength(2);
  });
});

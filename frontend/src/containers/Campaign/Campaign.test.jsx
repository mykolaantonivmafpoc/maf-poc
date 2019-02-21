import React from 'react';
import { mount } from 'enzyme';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import { Route, MemoryRouter } from 'react-router-dom';

import Campaign from './Campaign';

describe('Selected Campaign page', () => {
  let container;
  let component;
  let component_campaign;
  const mockStore = configureStore();
  const mock_campaignsArrLikeObj = {
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
    }
  };
  const mock_productsObj = {
    24518: {
      cost_price: '19.47500',
      department_id: 1,
      department_name: 'Department B',
      family_category_id: 1,
      family_category_name: 'FAMILY E',
      incr_basket: '0.0000',
      incr_basket_per: 'None',
      incr_margin: '3120.31300',
      incr_sales: '12331.72185',
      incr_sales_per: '10.9989',
      incr_traffic: '85.4862',
      incr_traffic_per: 'None',
      incr_tse: '54327.3706',
      incr_tse_per: 'None',
      ipromo_depth: '0.3002',
      product_id: 24518,
      product_name: '24518',
      promo_price: '21.0000',
      section_id: 3,
      section_name: 'SECTION C',
      slash_price: '28.5600',
      sub_family_category_id: 5,
      sub_family_category_name: 'SUBFAMILY J',
      supplier_id: 261,
      supplier_name: '261',
      total_sales: '18449.6000',
      volume_sold: '926.9150',
    }
  };
  let store;

  beforeEach(() => {
    store = mockStore({
      entities: {
        campaigns: mock_campaignsArrLikeObj,
        products: mock_productsObj
      },
      data: {
        options: {
          isFetching: true
        },
        campaignList: {
          isFetching: true,
          content: [1],
          meta: {
            type: 'Campaigns'
          }
        },
        singleCampaign: {
          content: [24518],
          meta: 1
        }
      },
      navigation: {
        filterShown: true
      }
    });

    container = document.createElement('div');
    document.body.appendChild(container);

    component = mount(
      <Provider store={store}>
        <MemoryRouter initialEntries={['/campaign/1']} initialIndex={0}>
          <Route path="/campaign/:id">
            <Campaign />
          </Route>
        </MemoryRouter>
      </Provider>,
      { attachTo: container }
    );

    component_campaign = component.find('Campaign').instance();
  });

  it('Should set correct coordinates', () => {
    const coordinates = { x: 'incr_margin', y: 'incr_tse' };

    component_campaign.setGraphAxes(coordinates);
    const stateX = component_campaign.state.x;
    const stateY = component_campaign.state.y;

    expect(stateX).toBe('incr_margin');
    expect(stateY).toBe('incr_tse');
  });

  it('Shоuld return correct data ', () => {
    const result = component_campaign.genRows();

    expect(result[0].promo).toBe('21.0000');
    expect(result[0].depth).toBe('0.3002');
  });
});

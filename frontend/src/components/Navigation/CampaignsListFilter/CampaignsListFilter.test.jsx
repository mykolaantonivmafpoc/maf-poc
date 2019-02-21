import React from 'react';
import { shallow, mount } from 'enzyme';
import { MemoryRouter, Route } from 'react-router-dom';

import CampaignsListFilter from './CampaignsListFilter';

const mockData = [
  { name: 'Ramadan', id: 1 },
  { name: 'Current Month', id: 2 },
  { name: 'Targets for Year', id: 3 },
  { name: 'Targets for Year', id: 4 }
];

describe('Campaigns List Filter Component', () => {
  it('should render the form without throwing an error', () => {
    const wrapper = shallow(<CampaignsListFilter />);
    expect(wrapper.find('.campaigns-list-filter')).toBeTruthy();
  });

  it('should generate the expected amount of items', () => {
    const filter = mount(
      <MemoryRouter>
        <Route>
          <CampaignsListFilter campaigns={mockData}/>
        </Route>
      </MemoryRouter>
    );
    filter.find('.filter-title').simulate('click');

    expect(filter.find('a.list-group-item')).toHaveLength(mockData.length);
  });

  it('should show the filter popover', () => {
    const wrapper = mount(<MemoryRouter><Route><CampaignsListFilter /></Route></MemoryRouter>);
    wrapper.find('.filter-title').simulate('click');

    expect(wrapper.find('.popover')).toHaveLength(1);
  });

  it('should hide the filter popover', () => {
    const wrapper = mount(<MemoryRouter><Route><CampaignsListFilter /></Route></MemoryRouter>);
    wrapper.find(CampaignsListFilter).instance().closePopOver();

    expect(wrapper.find('.popover')).toHaveLength(0);
  });
});

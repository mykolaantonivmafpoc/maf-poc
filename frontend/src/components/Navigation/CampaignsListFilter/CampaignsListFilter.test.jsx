import React from 'react';
import { shallow, mount } from 'enzyme';

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

  it('Should call the CB with the correct id', () => {
    let recivedId;
    const mockCallback = (id) => {
      recivedId = id;
    };
    const filter = mount(<CampaignsListFilter campaigns={mockData} onFilterChange={mockCallback}/>);
    const instance = filter.instance();
    instance.setState({ selectedId: 2 });
    instance.onSelectClicked();
    filter.update();

    expect(recivedId).toBe(2);
  });

  it('shuld show the filter popover', () => {
    const wrapper = mount(<CampaignsListFilter />);
    wrapper.find('.filter-title').simulate('click');

    expect(wrapper.find('.popover')).toHaveLength(1);
  });
});

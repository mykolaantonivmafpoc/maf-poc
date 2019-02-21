import React from 'react';
import { mount } from 'enzyme';
import { MemoryRouter, Route } from 'react-router-dom';

import SearchableComboList from './SearchableComboList';

describe('Searchable Combo List Component', () => {
  const mockData = [
    { name: 'Ramadan', id: 1 },
    { name: 'Current Month', id: 2 },
    { name: 'Targets for Year', id: 3 },
    { name: 'Targets for Year', id: 4 }
  ];

  it('should render the form without throwing an error', () => {
    const wrapper = mount(<MemoryRouter><Route><SearchableComboList /></Route></MemoryRouter>);
    expect(wrapper.find('.searchable-combo-list')).toBeTruthy();
  });

  it('onQueryCleared called, should show all items', () => {
    const comboList = mount(
      <MemoryRouter>
        <Route>
          <SearchableComboList data={mockData}/>
        </Route>
      </MemoryRouter>
    );
    comboList.find(SearchableComboList).instance().onQueryCleared();
    comboList.update();

    expect(comboList.find('.combo-list a')).toHaveLength(4);
  });

  it('Shuld filter correctly on query change', () => {
    const comboList = mount(
      <MemoryRouter>
        <Route>
          <SearchableComboList data={mockData}/>
        </Route>
      </MemoryRouter>
    );

    comboList.find(SearchableComboList).instance().filterListByQuery('onth');
    comboList.update();

    expect(comboList.find('.combo-list a')).toHaveLength(1);
  });
});

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
    const wrapper = mount(
      <MemoryRouter>
        <Route>
          <SearchableComboList />
        </Route>
      </MemoryRouter>
    );
    expect(wrapper.find('.searchable-combo-list')).toHaveLength(1);
  });

  it('onQueryCleared called, should show all items', () => {
    const wrapper = mount(
      <MemoryRouter>
        <Route>
          <SearchableComboList data={mockData}/>
        </Route>
      </MemoryRouter>
    );
    const comboList = wrapper.find('SearchableComboList');
    comboList.instance().onQueryCleared();
    comboList.update();

    expect(comboList.find('.searchable-combo-item')).toHaveLength(4);
  });

  it('Should filter correctly on query change', () => {
    const wrapper = mount(
      <MemoryRouter>
        <Route>
          <SearchableComboList data={mockData}/>
        </Route>
      </MemoryRouter>
    );
    const comboList = wrapper.find('SearchableComboList');
    comboList.instance().filterListByQuery('onth');
    wrapper.update();

    expect(wrapper.find('.searchable-combo-item')).toHaveLength(1);
  });

  it('Should wrapp elements in passed template', () => {
    const wrapper = mount(
      <MemoryRouter>
        <Route>
          <SearchableComboList
            data={mockData}
            itemWrapper={
              (content, id) => (
                <div className="testMeClass" id={id}>
                  {content}
                </div>
              )
            }
          />
        </Route>
      </MemoryRouter>
    );
    const comboList = wrapper.find('SearchableComboList');
    expect(comboList.find('.testMeClass')).toHaveLength(4);
    expect(comboList.find({ id: 2 })).toHaveLength(1);
  });

  it('Should return correct id on item select', () => {
    let returnedId = 0;
    const wrapper = mount(
      <MemoryRouter>
        <Route>
          <SearchableComboList
            data={mockData}
            onItemSelected={(id) => { returnedId = id; }}
          />
        </Route>
      </MemoryRouter>
    );

    const comboList = wrapper.find('SearchableComboList');
    comboList.instance().onItemSelected(
      {
        target: {
          closest: () => ({
            dataset: {
              id: 2
            }
          })
        }
      }
    );

    expect(returnedId).toBe(2);
  });
});

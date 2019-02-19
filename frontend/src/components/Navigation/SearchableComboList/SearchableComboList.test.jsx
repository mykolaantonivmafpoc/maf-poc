import React from 'react';
import { shallow, mount } from 'enzyme';

import SearchableComboList from './SearchableComboList';

describe('Searchable Combo List Component', () => {
  const mockData = [
    { name: 'Ramadan', id: 1 },
    { name: 'Current Month', id: 2 },
    { name: 'Targets for Year', id: 3 },
    { name: 'Targets for Year', id: 4 }
  ];

  it('should render the form without throwing an error', () => {
    const wrapper = shallow(<SearchableComboList />);
    expect(wrapper.find('.searchable-combo-list')).toBeTruthy();
  });

  it('On item click, should call the CB function with the correct id', () => {
    let recivedId;
    const mockCallback = (id) => {
      recivedId = id;
    };
    const comboList = shallow(<SearchableComboList data={mockData} onSelect={mockCallback}/>);
    comboList.instance().onItemClicked({ target: { dataset: { id: 2 } } });

    expect(recivedId).toBe(2);
  });

  it('onQueryCleared called, should show all items', () => {
    const comboList = mount(<SearchableComboList data={mockData} onSelect={() => {}}/>);
    comboList.instance().onQueryCleared();
    comboList.update();

    expect(comboList.find('.combo-list button')).toHaveLength(4);
  });

  it('Shuld filter correctly on query change', () => {
    const comboList = mount(<SearchableComboList data={mockData} onSelect={() => {}}/>);
    comboList.instance().filterListByQuery('onth');
    comboList.update();

    expect(comboList.find('.combo-list button')).toHaveLength(1);
  });
});

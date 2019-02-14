import React from 'react';
import { mount } from 'enzyme';
import DataGrid from './DataGrid';

describe('DataGrid Component', () => {
  const mockDataNoGroups = {
    groups: [
      {
        id: '',
        name: '',
        columns: [
          {
            name: 'Lorem',
            id: 'lorem'
          },
          {
            name: 'Ipsum',
            id: 'ipsum'
          }
        ]
      }
    ],
    rows: [
      {
        lorem: 'Lorem ipsum dolor sit',
        ipsum: 'consectetur adipiscing elit,'
      }
    ]
  };
  const mockDataWithGroups = {
    groups: [
      {
        id: 'group1',
        name: 'Group 1',
        columns: [
          {
            name: 'Lorem',
            id: 'lorem'
          },
          {
            name: 'Ipsum',
            id: 'ipsum'
          }
        ]
      },
      {
        id: 'group2',
        name: 'Group 2',
        columns: [
          {
            name: 'Lipsum',
            id: 'lipsum'
          }
        ]
      }
    ],
    rows: [
      {
        lorem: 'Lorem ipsum dolor sit',
        ipsum: 'consectetur adipiscing elit,',
        lipsum: 'LoremIpsumDolorSitAmet'
      }
    ]
  };

  it('getDataMeta - Should get correct metadata for data without groups', () => {
    const shuldBe = { columnsIdNameMap: { ipsum: 'Ipsum', lorem: 'Lorem' }, columnsToGroupMap: false, groupsItemsCount: false };
    const grid = mount(<DataGrid data={mockDataNoGroups} className="campaigns-data-grid"/>);
    const result = grid.instance().getDataMeta(mockDataNoGroups);

    expect(result).toEqual(shuldBe);
  });

  it('getDataMeta - Should get correct metadata for data with groups', () => {
    const shuldBe = { groupsItemsCount: { group1: 2, group2: 1 }, columnsIdNameMap: { lorem: 'Lorem', ipsum: 'Ipsum', lipsum: 'Lipsum' }, columnsToGroupMap: { lorem: 'group1', ipsum: 'group1', lipsum: 'group2' } };
    const grid = mount(<DataGrid data={mockDataWithGroups} className="campaigns-data-grid"/>);
    const result = grid.instance().getDataMeta(mockDataWithGroups);

    expect(result).toEqual(shuldBe);
  });
});

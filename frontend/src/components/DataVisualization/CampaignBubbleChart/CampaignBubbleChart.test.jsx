import React from 'react';
import { mount } from 'enzyme';
import CampaignBubbleChart from './CampaignBubbleChart';

describe('DataGrid Component', () => {
  const x = 'incr_margin';
  const Y = 'incr_tse';
  const Z = 'total_sales';
  const mockData = [
    {
      product_id: 1191128,
      product_name: '1191128',
      department_name: 'Department A',
      supplier_name: '4343',
      total_sales: '160538.3312',
      incr_margin: '11887.88300',
      incr_tse: '390392.2995',
      x: 11887.883,
      y: 390392.2995,
      z: 160538.3312
    },
    {
      product_id: 1153209,
      product_name: '1153209',
      department_name: 'Department B',
      supplier_name: '692',
      total_sales: '28753.9200',
      incr_margin: '5248.69695',
      incr_tse: '398122.9233',
      x: 5248.69695,
      y: 398122.9233,
      z: 28753.92
    },
    {
      product_id: 1104530,
      product_name: '1104530',
      department_name: 'Department C',
      supplier_name: '37',
      total_sales: '30544.8000',
      incr_margin: '4113.92695',
      incr_tse: '28712.8980',
      x: 4113.92695,
      y: 28712.898,
      z: 30544.8
    },
    {
      product_id: 1274431,
      product_name: '1274431',
      department_name: 'Department D',
      supplier_name: '692',
      total_sales: '10457.2000',
      incr_margin: '14203.72730',
      incr_tse: '33334.0239',
      x: 14203.7273,
      y: 33334.0239,
      z: 10457.2
    }
  ];
  const parsedData = {
    series: [
      [mockData[0]],
      [mockData[1]],
      [mockData[2]],
      [mockData[3]]
    ],
    xPlot: 8863.55855,
    xTitle: 'incr_margin',
    yPlot: 212640.53617500004,
    yTitle: 'incr_tse'
  };

  it('Chart should render', () => {
    const container = document.createElement('div');
    document.body.appendChild(container);

    const chart = mount(<CampaignBubbleChart x={x} y={Y} z={Z} data={mockData} className="campaign-chart"/>, { attachTo: container });
    expect(chart.find('#chartWrapper')).toHaveLength(1);
  });

  it('Should generate correct data object', () => {
    const container = document.createElement('div');
    document.body.appendChild(container);

    const chart = mount(<CampaignBubbleChart x={x} y={Y} z={Z} data={mockData} className="campaign-chart"/>, { attachTo: container });
    const resultObj = chart.instance().getChartData();

    expect(resultObj).toEqual(parsedData);
  });

  it('Should render chart', () => {
    const container = document.createElement('div');
    container.id = 'targetId';
    document.body.appendChild(container);

    const chart = mount(<CampaignBubbleChart x={x} y={Y} z={Z} data={mockData} className="campaign-chart"/>, { attachTo: container });
    chart.instance().generateChart(parsedData, 'targetId');
    chart.update();

    expect(container.querySelector('.highcharts-root')).toBeTruthy();
  });
});

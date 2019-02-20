import React from 'react';
import Highcharts from 'highcharts';
import HighchartsMore from 'highcharts-more';
import { meanBy } from 'lodash';
import './CampaignBubbleChart.scss';
import PropTypes from 'prop-types';
import { ChartConfig, ChartTooltip, getOneSeriesConfig } from './ChartConfig';

class CampaignBubbleChart extends React.Component {
  static propTypes = {
    className: PropTypes.string,
    data: PropTypes.arrayOf(PropTypes.shape({})),
    x: PropTypes.string.isRequired,
    y: PropTypes.string.isRequired,
    z: PropTypes.string.isRequired
  }

  static defaultProps = {
    className: '',
    data: []
  };

  constructor(props) {
    super(props);
    HighchartsMore(Highcharts);
  }

  componentDidUpdate() {
    const chartData = this.getChartData();
    this.generateChart(chartData, 'chartWrapper');
  }

  getChartData = () => {
    const { data: products, x, y, z } = this.props;
    const avgX = meanBy(products, p => {
      const X = parseFloat(p[x]);
      return Number.isNaN(X) ? 0 : X;
    });
    const avgY = meanBy(products, p => {
      const Y = parseFloat(p[y]);
      return Number.isNaN(Y) ? 0 : Y;
    });
    const series = [[], [], [], []];

    const getQadrant = product => {
      let qadrant = 0;
      if (product[x] > avgX && product[y] > avgY) { qadrant = 0; }
      if (product[x] < avgX && product[y] > avgY) { qadrant = 1; }
      if (product[x] < avgX && product[y] < avgY) { qadrant = 2; }
      if (product[x] > avgX && product[y] < avgY) { qadrant = 3; }
      return qadrant;
    };

    products.forEach(product => {
      series[getQadrant(product)].push({
        ...product,
        x: parseFloat(product[x]),
        y: parseFloat(product[y]),
        z: parseFloat(product[z])
      });
    });

    const data = {
      series,
      xPlot: avgX,
      yPlot: avgY,
      xTitle: x || '',
      yTitle: y || ''
    };

    return data;
  }

  generateChart = (data, targerId) => {
    const chartOptions = {
      chart: ChartConfig.chart,
      legend: ChartConfig.legend,
      title: ChartConfig.title,
      colors: ChartConfig.colors,
      tooltip: ChartTooltip,
      series: [
        getOneSeriesConfig(data.series[0], ChartConfig.colors[3]),
        getOneSeriesConfig(data.series[1], ChartConfig.colors[1]),
        getOneSeriesConfig(data.series[2], ChartConfig.colors[2]),
        getOneSeriesConfig(data.series[3], ChartConfig.colors[3])
      ],
      xAxis: ChartConfig.getXAxis(data.xTitle, data.xPlot),
      yAxis: ChartConfig.getXAxis(data.yTitle, data.yPlot)
    };

    Highcharts.chart(targerId, chartOptions);
  }

  render() {
    const { data, x, y, z, ...divProps } = this.props;

    return (
      <div id="chartWrapper" {...divProps} />
    );
  }
}

export default CampaignBubbleChart;

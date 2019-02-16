import React from 'react';
import Highcharts from 'highcharts';
import HighchartsMore from 'highcharts-more';
import { meanBy } from 'lodash';
import './CampaignBubbleChart.css';
import PropTypes from 'prop-types';

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

    this.generateChart(chartData);
  }

  getChartStyleSettings = () => {
    const settings = {};
    const FONT_FAMILY = 'OpenSans';

    settings.chart_titleStyle = {
      color: '#8d8d8d',
      fontSize: 12,
      fontFamily: FONT_FAMILY
    };

    settings.chart_legedFontStyle = {
      color: '#404040',
      fontSize: 10,
      fontFamily: FONT_FAMILY,
      fontWeight: 100
    };

    settings.chart_markerSettings = {
      lineColor: '#ffffffff',
      lineWidth: 2,
      states: {
        hover: {
          lineColor: '#FFFFFFFF',
          lineWidth: 2,
          halo: {
            enabled: false,
            size: 300
          }
        }
      }
    };

    settings.getPlotSettingsObj = (value) => {
      const out = {
        color: '#2f2e32',
        dashStyle: 'dot',
        width: 2,
        value,
        zIndex: 3
      };
      return out;
    };

    settings.legend = {
      layout: 'horizontal',
      align: 'center',
      verticalAlign: 'top',
      backgroundColor: '#FFFFFF00',
      itemStyle: settings.chart_legedFontStyle
    };

    settings.color = ['#1183acc0', '#cfcfcfc0', '#2b2b2bc0', '#66ad32c0'];

    settings.halo = (color) => ({
      attributes: {
        fill: color,
        stroke: color,
        lineWidth: 15,
        opacity: 1
      }
    });

    return settings;
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

  generateChart(data) {
    const styleSettings = this.getChartStyleSettings();

    Highcharts.chart('chartWrapper', {
      chart: {
        type: 'bubble',
        plotBorderWidth: 0,
        zoomType: 'xy'
      },

      legend: styleSettings.legend,

      title: {
        text: ''
      },

      xAxis: {
        title: {
          text: data.xTitle.toUpperCase(),
          style: styleSettings.chart_titleStyle
        },
        gridLineWidth: 1,
        startOnTick: false,
        endOnTick: false,
        maxPadding: -0.2,
        width: '100%',
        labels: {
          format: '{value}'
        },
        plotLines: [styleSettings.getPlotSettingsObj(data.xPlot)]
      },

      yAxis: {
        title: {
          text: data.yTitle.toUpperCase(),
          style: styleSettings.chart_titleStyle
        },
        gridLineWidth: 1,
        startOnTick: false,
        endOnTick: false,
        labels: {
          format: '{value}'
        },
        maxPadding: 0.2,
        plotLines: [{
          value: 51685.48074016859,
          color: '#2f2e32',
          dashStyle: 'dot',
          width: 2
        }]
        // plotLines: [styleSettings.getPlotSettingsObj(data.yPlot)]
      },

      colors: styleSettings.color,

      series: [
        {
          name: 'Lorem',
          marker: styleSettings.chart_markerSettings,
          states: {
            hover: {
              halo: styleSettings.halo(styleSettings.color[0])
            }
          },
          data: data.series[0]
        },
        {
          name: 'Ipsum',
          marker: styleSettings.chart_markerSettings,
          states: {
            hover: {
              halo: styleSettings.halo(styleSettings.color[1])
            }
          },
          data: data.series[1]
        },
        {
          name: 'Ipsum',
          marker: styleSettings.chart_markerSettings,
          states: {
            hover: {
              halo: styleSettings.halo(styleSettings.color[2])
            }
          },
          data: data.series[2]
        },
        {
          name: 'Ipsum',
          marker: styleSettings.chart_markerSettings,
          states: {
            hover: {
              halo: styleSettings.halo(styleSettings.color[3])
            }
          },
          data: data.series[3]
        }
      ],

      tooltip: {
        borderColor: '#00000000',
        backgroundColor: '#00000000',
        useHTML: true,
        shadow: false,
        headerFormat: '<table class="chart-tooltip">',
        pointFormat: `<tbody>
                        <tr>
                            <td class="tooltip-label">Product ID:</td>
                            <td>{point.product_id}</td>
                        </tr>
                        <tr>
                            <td class="tooltip-label">Product Name:</td>
                            <td>{point.product_name}</td>
                        </tr>
                        <tr>
                            <td class="tooltip-label">Department Name:</td>
                            <td>{point.department_name}</td>
                        </tr>
                        <tr>
                            <td class="tooltip-label">Suplier ID:</td>
                            <td>{point.supplier_name}</td>
                        </tr>
                        <tr>
                            <td class="tooltip-label">Total Sales:</td>
                            <td>{point.total_sales}</td>
                        </tr>
                        <tr>
                            <td class="tooltip-label">Incr Margin:</td>
                            <td>{point.incr_margin}</td>
                        </tr>
                      </tbody>`,
        footerFormat: '</table>',
        followPointer: true
      }
    });
  }

  render() {
    const { data, x, y, z, ...divProps } = this.props;

    return (
      <div id="chartWrapper" {...divProps} />
    );
  }
}

export default CampaignBubbleChart;

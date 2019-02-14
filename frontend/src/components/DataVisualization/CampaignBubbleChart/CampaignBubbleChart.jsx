import React from 'react';
import Highcharts from 'highcharts';
import HighchartsMore from 'highcharts-more';
import './CampaignBubbleChart.css';
import PropTypes from 'prop-types';

class CampaignBubbleChart extends React.Component {
  static propTypes = {
    className: PropTypes.string
  }

  static defaultProps = {
    className: ''
  };

  constructor(props) {
    super(props);
    HighchartsMore(Highcharts);
  }

  componentDidMount() {
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
      lineColor: 'transparent',
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
      return {
        color: '#2f2e32',
        dashStyle: 'dot',
        width: 2,
        value,
        zIndex: 3
      };
    };

    settings.legend = {
      layout: 'horizontal',
      align: 'center',
      verticalAlign: 'top',
      backgroundColor: '#FFFFFF00',
      itemStyle: settings.chart_legedFontStyle
    };

    settings.color = ['#8ac753FF', '#1fa5c6FF', '#dfdfdfFF', '#4a4a4aFF'];

    settings.halo = {
      attributes: {
        fill: '#8ac753FF',
        stroke: '#8ac753FF',
        lineWidth: 15,
        opacity: 1
      }
    };

    return settings;
  }

  getChartData = () => {
    const data = {
      series: [],
      xPlot: 70,
      yPlot: 90
    };

    data.series[0] = [
      { x: 95, y: 95, z: 13.8, id: '1198937', name: 'Coca-Cola', description: 'Carbonated soft drink', suplierId: '558', totalSales: '608608', incrMargin: 7497.6201 },
      { x: 86.5, y: 102.9, z: 14.7, id: '1198937', name: 'Coca-Cola', description: 'Carbonated soft drink', suplierId: '558', totalSales: '608608', incrMargin: 7497.6201 },
      { x: 80.8, y: 91.5, z: 15.8, id: '1198937', name: 'Coca-Cola', description: 'Carbonated soft drink', suplierId: '558', totalSales: '608608', incrMargin: 7497.6201 },
      { x: 80.4, y: 102.5, z: 12, id: '1198937', name: 'Coca-Cola', description: 'Carbonated soft drink', suplierId: '558', totalSales: '608608', incrMargin: 7497.6201 }
    ];

    data.series[1] = [
      { x: 80.3, y: 86.1, z: 11.8, id: '1198937', name: 'Coca-Cola', description: 'Carbonated soft drink', suplierId: '558', totalSales: '608608', incrMargin: 7497.6201 },
      { x: 78.4, y: 70.1, z: 16.6, id: '1198937', name: 'Coca-Cola', description: 'Carbonated soft drink', suplierId: '558', totalSales: '608608', incrMargin: 7497.6201 },
      { x: 74.2, y: 68.5, z: 14.5, id: '1198937', name: 'Coca-Cola', description: 'Carbonated soft drink', suplierId: '558', totalSales: '608608', incrMargin: 7497.6201 },
      { x: 73.5, y: 83.1, z: 10, id: '1198937', name: 'Coca-Cola', description: 'Carbonated soft drink', suplierId: '558', totalSales: '608608', incrMargin: 7497.6201 }
    ];

    return data;
  }

  generateChart(data) {
    const styleSettings = this.getChartStyleSettings();

    Highcharts.chart('chartWrapper', {
      chart: {
        type: 'bubble',
        plotBorderWidth: 1,
        zoomType: 'xy'
      },

      legend: styleSettings.legend,

      title: {
        text: ''
      },

      xAxis: {
        title: {
          text: 'INCR MARGIN',
          style: styleSettings.chart_titleStyle
        },
        gridLineWidth: 1,
        startOnTick: false,
        endOnTick: false,
        maxPadding: -0.2,
        width: '95%',
        labels: {
          format: '{value}'
        },
        plotLines: [styleSettings.getPlotSettingsObj(data.xPlot)]
      },

      yAxis: {
        title: {
          text: 'INCR TRAFFIC',
          style: styleSettings.chart_titleStyle
        },
        gridLineWidth: 1,
        startOnTick: false,
        endOnTick: false,
        labels: {
          format: '{value}'
        },
        maxPadding: 0.2,
        plotLines: [styleSettings.getPlotSettingsObj(data.yPlot)]
      },

      colors: styleSettings.color,

      series: [
        {
          name: 'Lorem',
          marker: styleSettings.chart_markerSettings,
          states: {
            hover: {
              halo: styleSettings.halo
            }
          },
          data: data.series[0]
        },
        {
          name: 'Ipsum',
          marker: styleSettings.chart_markerSettings,
          data: data.series[1]
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
                            <td>{point.id}</td>
                        </tr>
                        <tr>
                            <td class="tooltip-label">Product Name:</td>
                            <td>{point.name}</td>
                        </tr>
                        <tr>
                            <td class="tooltip-label">Description:</td>
                            <td>{point.description}</td>
                        </tr>
                        <tr>
                            <td class="tooltip-label">Suplier ID:</td>
                            <td>{point.suplierId}</td>
                        </tr>
                        <tr>
                            <td class="tooltip-label">Total Sales:</td>
                            <td>{point.totalSales}</td>
                        </tr>
                        <tr>
                            <td class="tooltip-label">Incr Margin:</td>
                            <td>{point.incrMargin}</td>
                        </tr>
                      </tbody>`,
        footerFormat: '</table>',
        followPointer: true
      }
    });
  }

  render() {
    const { className } = this.props;

    return (
      <div id="chartWrapper" className={className} />
    );
  }
}

export default CampaignBubbleChart;

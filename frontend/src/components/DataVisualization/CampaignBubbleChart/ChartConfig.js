const FONT_FAMILY = 'OpenSans';

const getPlotSettingsObj = (value) => {
  return {
    color: '#2f2e32',
    dashStyle: 'dot',
    width: 2,
    value,
    zIndex: 3
  };
};

const titleStyle = {
  color: '#8d8d8d',
  fontSize: 12,
  fontFamily: FONT_FAMILY
};

export const ChartConfig = {
  colors: ['#1183acc0', '#cfcfcfc0', '#2b2b2bc0', '#66ad32c0'],

  chart: {
    type: 'bubble',
    plotBorderWidth: 0,
    zoomType: 'xy'
  },

  title: {
    text: ''
  },

  legend: {
    layout: 'horizontal',
    align: 'center',
    verticalAlign: 'top',
    backgroundColor: '#FFFFFF00',
    itemStyle: {
      color: '#404040',
      fontSize: 10,
      fontFamily: FONT_FAMILY,
      fontWeight: 100
    }
  },

  getXAxis: (title, plotLinesData) => {
    return {
      title: {
        text: title.toUpperCase(),
        style: titleStyle
      },
      gridLineWidth: 1,
      startOnTick: false,
      endOnTick: false,
      maxPadding: -0.2,
      width: '100%',
      labels: {
        format: '{value}'
      },
      plotLines: [getPlotSettingsObj(plotLinesData)]
    };
  },

  getYAxis: (title, plotLinesData) => {
    return {
      title: {
        text: title.toUpperCase(),
        style: ChartConfig.titleStyle
      },
      gridLineWidth: 1,
      startOnTick: false,
      endOnTick: false,
      maxPadding: 0.2,
      labels: {
        format: '{value}'
      },
      plotLines: [getPlotSettingsObj(plotLinesData)]
    };
  }
};

export const ChartTooltip = {
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
};

export const getOneSeriesConfig = (data, color) => {
  return {
    data,
    marker: {
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
    },
    states: {
      hover: {
        halo: {
          attributes: {
            fill: color,
            stroke: color,
            lineWidth: 15,
            opacity: 1
          }
        }
      }
    }
  };
};

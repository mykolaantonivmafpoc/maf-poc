import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import CampaignBubbleChart from '../../components/DataVisualization/CampaignBubbleChart';
import DataGrid from '../../components/DataVisualization/DataGrid';
import { loadAllCampaigns, loadCampaign } from '../../actions/campaignActions';
import { productListTableDef } from '../../config';

import './Campaign.css';

class Campaign extends Component {
  static propTypes = {
    products: PropTypes.arrayOf(PropTypes.shape([])),
    meta: PropTypes.shape({ type: PropTypes.string }),
    campaign: PropTypes.shape({}),
    match: PropTypes.shape({}).isRequired
  };

  static defaultProps = {
    meta: { type: 'Campaign' },
    products: [],
    campaign: {}
  }

  static getDerivedStateFromProps(props, state) {
    const {
      loadAllCampaigns: loadAll,
      loadCampaign: loadSingle,
      isFetchingOptions,
      isFetchingList,
      match
    } = props;
    if (isFetchingList !== state.isFetchingList || isFetchingOptions !== state.isFetchingOptions) {
      if (isFetchingOptions === false && isFetchingList === undefined) {
        loadAll();
      }
      if (isFetchingList === false) {
        loadSingle(match.params.id);
      }
      return { isFetchingOptions, isFetchingList };
    }

    return null;
  }

  constructor() {
    super();
    this.state = {};
  }

  genRows = () => {
    const { products } = this.props;
    return products.map(product => {
      // department_id: 14
      // department_name: "Department N"
      // family_category_id: 11
      // family_category_name: "Family category K"
      // product_id: 1
      // product_name: "Product A"
      // section_id: 17
      // section_name: "Section Q"
      // sub_family_category_id: 19
      // sub_family_category_name: "Sub family category S"
      // supplier_id: 18
      // supplier_name: "Supplier R"
      // timestamp: "Sat, 13 Feb 2016 00:00:00 GMT"

      return {
        campaign: { value: <this.General id={product.product_id} name={product.product_name}/>, className: 'cell-campaign' },
        totalSales: { value: product.total_sales, className: 'cell-sales' },
        volume: { value: product.volume_sold, className: 'cell-volume' },
        sales: <this.ValuePercentPare label="Sales" value={product.incr_sales} percent={product.incr_sales_per} />,
        margin: <this.ValuePercentPare label="Margin" value={product.incr_margin} percent={product.incr_margin_per} />,
        traffic: <this.ValuePercentPare label="Traffic" value={product.incr_traffic} percent={product.incr_traffic_per} />,
        basket: <this.ValuePercentPare label="Basket" value={product.incr_basket} percent={product.incr_basket_per} />,
        tse: <this.ValuePercentPare label="TSE" value={product.incr_tse} percent={product.incr_tse_per} />,
        promo: product.promo_price,
        slash: product.slash_price,
        cosnt: product.cost_price,
        depth: product.ipromo_depth,
        mechanics: 'null'
      };
    });
  }

  ValuePercentPare = (props) => {
    const class_percentageColor = +props.percent > 0 ? 'text-success' : 'text-danger';

    return (
      <div>
        <div>{props.value}</div>
        <div className={`percentages ${class_percentageColor}`}>
          {props.percent}
          %
        </div>
      </div>
    );
  }

  General = (props) => {
    return (
      <div className="cell-general">
        <div className="section-id">{props.id}</div>
        <div className="section-name">{props.name}</div>
      </div>
    );
  }

  render() {
    const data = { ...productListTableDef, rows: this.genRows() };
    return (
      <div>
        <CampaignBubbleChart className="campaign-chart"/>
        <DataGrid data={data} className="campaign-data-grid"/>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  const {
    entities: {
      campaigns,
      products
    },
    data: {
      options: {
        isFetching: isFetchingOptions
      },
      campaignList: {
        isFetching: isFetchingList,
      },
      singleCampaign: {
        content: productList,
        meta
      }
    }
  } = state;

  return {
    products: productList && productList.map(id => products[id]),
    campaign: campaigns[meta],
    isFetchingList,
    isFetchingOptions
  };
};

export default connect(mapStateToProps, {
  loadAllCampaigns,
  loadCampaign
})(Campaign);

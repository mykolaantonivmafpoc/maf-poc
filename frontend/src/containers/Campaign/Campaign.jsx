import React, { Component } from 'react';
import { withRouter, Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import CampaignBubbleChart from '../../components/DataVisualization/CampaignBubbleChart';
import DataGrid from '../../components/DataVisualization/DataGrid';
import { loadAllCampaigns, loadCampaign } from '../../actions/campaignActions';
import NavWrapper from '../NavWrapper';
import SettingsPopup from '../../components/DataVisualization/SettingsPopup';
import PageHeader from '../../components/Navigation/PageHeader';
import CampaignsListFilter from '../../components/Navigation/CampaignsListFilter';
import { productListTableDef } from '../../config';

import './Campaign.css';

class Campaign extends Component {
  static propTypes = {
    products: PropTypes.arrayOf(PropTypes.shape([])),
    meta: PropTypes.shape({ type: PropTypes.string }),
    campaign: PropTypes.shape({}),
    match: PropTypes.shape({}).isRequired,
    campaigns: PropTypes.arrayOf(PropTypes.shape({})),
    campaignsPageTitle: PropTypes.string,
    history: PropTypes.shape({}).isRequired
  };

  static defaultProps = {
    meta: { type: 'Campaign' },
    products: [],
    campaign: {},
    campaigns: [],
    campaignsPageTitle: 'Campaigns'
  }

  state = {
    x: 'incr_margin',
    y: 'incr_tse',
    z: 'total_sales'
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
    this.setGraphAxes = this.setGraphAxes.bind(this);
    this.onFilterChange = this.onFilterChange.bind(this);
  }

  onFilterChange(id) {
    const { history } = this.props;
    if (id > -1) {
      const path = document.location.pathname.split('/');
      path.pop();
      path.push(id);
      history.push({
        pathname: path.join('/'),
        search: ''
      });
    }
  }

  setGraphAxes(coords) {
    this.setState({
      ...coords
    });
  }

  genRows = () => {
    const { products } = this.props;
    return products.map(product => ({
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
    }));
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
    const { products, campaign, campaigns, campaignsPageTitle } = this.props;
    const { x, y, z } = this.state;

    const filters = {
      visible: true,
      content: (
        <CampaignsListFilter
          onFilterChange={this.onFilterChange}
          campaigns={campaigns}
          selectedCampaignName={campaign.name}
        />
      )
    };

    return (
      <NavWrapper>
        <PageHeader pageTitle={<Link className="small-title" to="/campaigns">{campaignsPageTitle}</Link>} filters={filters}/>
        <SettingsPopup kpi={campaign.kpi} onChange={this.setGraphAxes} x={x} y={y}/>
        <CampaignBubbleChart data={products} x={x} y={y} z={z} className="campaign-chart"/>
        <DataGrid data={data} className="campaign-data-grid"/>
      </NavWrapper>
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
        content: cmapaignList,
        meta: compaignListMeta
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
    campaigns: cmapaignList && cmapaignList.map(id => campaigns[id]),
    campaignsPageTitle: compaignListMeta && compaignListMeta.type,
    isFetchingList,
    isFetchingOptions
  };
};

export default withRouter(connect(mapStateToProps, {
  loadAllCampaigns,
  loadCampaign
})(Campaign));

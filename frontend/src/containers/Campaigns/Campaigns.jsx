import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { loadAllCampaigns } from '../../actions/campaignActions';
import DataGrid from '../../components/DataVisualization/DataGrid';
import NavWrapper from '../NavWrapper';
import { campaignListTableDef } from '../../config';

import './Campaigns.css';

class Campaigns extends Component {
  static propTypes = {
    campaigns: PropTypes.arrayOf(PropTypes.shape([])),
    meta: PropTypes.shape({ type: PropTypes.string })
  };

  static defaultProps = {
    meta: { type: 'Campaign' },
    campaigns: []
  }

  static getDerivedStateFromProps(props, state) {
    const { loadAllCampaigns: load, isFetchingOptions } = props;
    if (isFetchingOptions !== state.isFetchingOptions) {
      if (isFetchingOptions === false) {
        load();
      }
      return { isFetchingOptions };
    }

    return null;
  }

  constructor() {
    super();
    this.state = {};
  }

  Campaign = ({ type, name, id, date }) => (
    <div className="cell-campaign-inner-wrapper">
      <div className="text-muted campaign-type">{type}</div>
      <div className="campaign-name"><Link to={`/campaign/${id}`}>{name}</Link></div>
      <div className="text-muted campaign-date">{date}</div>
    </div>
  );

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

  genRows() {
    const { campaigns } = this.props;
    return campaigns.map((row) => {
      const transformedRow = {};
      const dateTo = new Date(row.date_to);
      const dateFrom = new Date(row.date_from);

      transformedRow.campaign = {
        value: (<this.Campaign
          type={row.campaign_type}
          name={row.name}
          date={`${dateFrom} - ${dateTo}`}
          id={row.id}
        />),
        className: 'cell-campaign'
      };

      transformedRow.sales = (
        <this.ValuePercentPare
          value={row.incr_sales}
          percent={row.incr_sales_per}
        />
      );

      transformedRow.margin = (
        <this.ValuePercentPare
          value={row.incr_margin}
          percent={row.incr_sales_per} // Missing Percent
        />
      );

      transformedRow.traffic = (
        <this.ValuePercentPare
          value={row.incr_traffic}
          percent={row.incr_traffic_per}
        />
      );

      transformedRow.basket = (
        <this.ValuePercentPare
          value={row.incr_basket}
          percent={row.incr_basket_per}
        />
      );

      transformedRow.tse = (
        <this.ValuePercentPare
          value={row.incr_tse}
          percent={row.incr_tse_per}
        />
      );

      return transformedRow;
    });
  }

  render() {
    const { meta } = this.props;
    const data = { ...campaignListTableDef, rows: this.genRows() };

    return (
      <NavWrapper>
        <header><h1>{meta && meta.type}</h1></header>
        <DataGrid data={data} className="campaigns-data-grid"/>
      </NavWrapper>
    );
  }
}

const mapStateToProps = (state) => {
  const {
    entities: {
      campaigns,
    },
    data: {
      options: {
        isFetching: isFetchingOptions
      },
      campaignList: {
        content: campaignList,
        meta
      }
    }
  } = state;

  return {
    campaigns: campaignList && campaignList.map(id => campaigns[id]),
    meta,
    isFetchingOptions
  };
};

export default connect(mapStateToProps, { loadAllCampaigns })(Campaigns);

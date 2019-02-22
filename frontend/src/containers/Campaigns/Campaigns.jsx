import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { isEqual } from 'lodash';

import { loadAllCampaigns } from '../../actions/campaignActions';
import DataGrid from '../../components/DataVisualization/DataGrid';
import PageHeader from '../../components/Navigation/PageHeader';
import NavWrapper from '../NavWrapper';
import { campaignListTableDef, routeByName } from '../../config';
import { formatDate } from '../../utils/dates/dates';

import './Campaigns.scss';

class Campaigns extends Component {
  static propTypes = {
    campaigns: PropTypes.arrayOf(PropTypes.shape([])),
    meta: PropTypes.shape({ type: PropTypes.string }),
    history: PropTypes.shape({}),
    loadAllCampaigns: PropTypes.func.isRequired,
    filter: PropTypes.shape({})
  };

  static defaultProps = {
    meta: { type: 'Campaign' },
    campaigns: [],
    history: {},
    filter: {}
  }

  constructor(props) {
    super(props);
    this.state = {};
  }

  componentWillMount() {
    this.fetch();
  }

  componentDidUpdate(prevProps) {
    const { filter: prevfilter } = prevProps;
    const { filter } = this.props;

    if (!isEqual(filter, prevfilter)) {
      this.fetch();
    }
  }

  Campaign = ({ type, name, date }) => (
    <div className="cell-campaign-inner-wrapper">
      <div className="text-muted campaign-type">{type}</div>
      <div className="campaign-name">{name}</div>
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

  fetch() {
    const { loadAllCampaigns: load, filter } = this.props;
    load(filter);
  }

  genRows() {
    const { campaigns } = this.props;
    return campaigns.map((row) => {
      const transformedRow = {};
      const dateTo = formatDate(new Date(row.date_to));
      const dateFrom = formatDate(new Date(row.date_from));
      const { history } = this.props;

      transformedRow.campaign = {
        value: (<this.Campaign
          type={row.campaign_type}
          name={row.name}
          date={`${dateFrom} - ${dateTo}`}
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

      transformedRow.id = row.id;

      transformedRow.action = function action() {
        const path = routeByName('campaign').path.replace(':id', this.id);
        history.push(path);
        document.querySelector('.main-c').scrollTo(0, 0);
      };

      return transformedRow;
    });
  }

  render() {
    const { meta } = this.props;
    const data = { ...campaignListTableDef, rows: this.genRows() };

    return (
      <NavWrapper>
        <PageHeader pageTitle={meta && meta.type}/>
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
      campaignList: {
        content: campaignList,
        meta
      }
    },
    filter
  } = state;

  return {
    campaigns: campaignList && campaignList.map(id => campaigns[id]),
    meta,
    filter
  };
};

export default connect(mapStateToProps, { loadAllCampaigns })(Campaigns);

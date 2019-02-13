import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { loadAllCampaigns, loadCampaign } from '../../actions/campaignActions';


class Campaigns extends Component {
  static propTypes = {
    campaigns: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
    loadAllCampaigns: PropTypes.func.isRequired,
    loadCampaign: PropTypes.func.isRequired
  };

  componentWillMount() {
    const { loadAllCampaigns: load, loadCampaign: lc } = this.props;
    load();
    setTimeout(() => {
      lc(1, ['CAMPAIGN_DATE', 'CAMPAIGN_NAME', 'CAMPAIGN_TYPE']);
    }, 2000);
  }

  render() {
    const { campaigns } = this.props;

    return (
      <section>
        <header><h1>Campaigns</h1></header>
        <p>{JSON.stringify(campaigns)}</p>
      </section>
    );
  }
}

const mapStateToProps = (state) => {
  const {
    entities: { campaigns }
  } = state;
  return {
    campaigns: Object.values(campaigns)
  };
};

export default connect(mapStateToProps, {
  loadAllCampaigns, loadCampaign
})(Campaigns);

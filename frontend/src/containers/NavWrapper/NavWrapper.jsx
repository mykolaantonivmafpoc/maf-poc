import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import * as navigationActions from '../../actions/navigationActions';
import { loadCampaign, loadAllCampaigns } from '../../actions/campaignActions';
import { logout } from '../../actions/userActions';

import Filter from '../../components/Navigation/Filter';
import MainNav from '../../components/Navigation/MainNav';
import MobileNav from '../../components/Navigation/MobileNav';
import filterAction from '../../actions/filterActions';

import './NavWrapper.scss';

const NavWrapper = ({
  children,
  navigation,
  showFitler,
  hideFilter,
  hideMainNav,
  showMainNav,
  removeMainNav,
  kpi_options,
  logout: logoutFn,
  filterAction: setFilter,
  filter: flt
}) => {
  return (
    <section>
      {navigation.navShown === undefined || navigation.navShown === true ? (
        <MainNav
          removeMainNav={removeMainNav}
          showMainNav={showMainNav}
          hideMainNav={hideMainNav}
          navShown={navigation.navShown}
          logout={logoutFn}
        />
      ) : null}
      <MobileNav
        hideFilter={hideFilter}
        showFitler={showFitler}
        showMainNav={showMainNav}
        removeMainNav={removeMainNav}
        hideMainNav={hideMainNav}
        logout={logoutFn}
      />
      {navigation.filterShown
        ? (
          <Filter
            hideFilter={hideFilter}
            filter={flt}
            options={kpi_options}
            filterAction={setFilter}
          />
        )
        : null}
      <section className="main-c">
        {children}
      </section>
    </section>
  );
};

const manualyDenormalizeProps = (data) => {
  const { campaigns, campaignMeta, campaignsMeta, ...options } = data;
  const kpi_options = {};

  const kpi_options_raw = (campaigns && campaignMeta && campaigns[campaignMeta].kpi_options)
    || (campaignsMeta && campaignsMeta.kpi_options)
    || {};
  Object.keys(kpi_options_raw).forEach(option => {
    if (options[option]) {
      kpi_options[option] = [...new Set(kpi_options_raw[option])].map(id => {
        return options[option][id];
      }).sort((a, b) => {
        let out = 0;
        if (a.name < b.name) { out = -1; }
        if (a.name > b.name) { out = 1; }
        return out;
      });
    }
  });

  return kpi_options;
};

const mapStateToProps = state => {
  const {
    navigation,
    data: {
      singleCampaign: {
        meta: campaignMeta,
      },
      campaignList: {
        meta: campaignsMeta
      }
    },
    entities: {
      campaigns,
      department,
      family_category,
      section,
      sub_family_category
    },
    filter
  } = state;

  return {
    navigation,
    kpi_options: manualyDenormalizeProps({
      campaigns,
      campaignMeta,
      campaignsMeta,
      department,
      family_category,
      section,
      sub_family_category
    }),
    filter
  };
};

NavWrapper.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node
  ]).isRequired,
  navigation: PropTypes.shape({
    isShown: PropTypes.bool
  }).isRequired,
  hideFilter: PropTypes.func.isRequired,
  showFitler: PropTypes.func.isRequired,
  showMainNav: PropTypes.func.isRequired,
  removeMainNav: PropTypes.func.isRequired,
  hideMainNav: PropTypes.func.isRequired,
  kpi_options: PropTypes.shape({}),
  logout: PropTypes.func.isRequired,
  match: PropTypes.shape({}).isRequired,
  filterAction: PropTypes.func.isRequired,
  filter: PropTypes.shape({})
};

NavWrapper.defaultProps = {
  kpi_options: {},
  filter: {}
};

export default withRouter(connect(
  mapStateToProps,
  { ...navigationActions, loadCampaign, loadAllCampaigns, logout, filterAction }
)(NavWrapper));

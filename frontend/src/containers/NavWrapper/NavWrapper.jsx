import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import * as navigationActions from '../../actions/navigationActions';
import { loadCampaign } from '../../actions/campaignActions';
import { logout } from '../../actions/userActions';

import Filter from '../../components/Navigation/Filter';
import MainNav from '../../components/Navigation/MainNav';
import MobileNav from '../../components/Navigation/MobileNav';

import './NavWrapper.css';

const NavWrapper = ({
  children,
  navigation,
  showFitler,
  hideFilter,
  hideMainNav,
  showMainNav,
  removeMainNav,
  kpi_options,
  loadCampaign: lc,
  logout: logoutFn
}) => (
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
      ? <Filter hideFilter={hideFilter} options={kpi_options} filterAction={lc}/>
      : null}
    <section className="main-c">
      {children}
    </section>
  </section>
);

const mapStateToProps = state => {
  const {
    navigation,
    data: {
      singleCampaign: {
        meta: campaignMeta,
      },
    },
    entities: {
      campaigns,
      department,
      family_category,
      section,
      sub_family_category
    }
  } = state;

  const options = { department, family_category, section, sub_family_category };
  const kpi_options = {};

  const kpi_options_row = (campaigns && campaignMeta && campaigns[campaignMeta].kpi_options) || {};
  Object.keys(kpi_options_row).forEach(option => {
    if (options[option]) {
      kpi_options[option] = [...new Set(kpi_options_row[option])].map(id => {
        return options[option][id];
      });
    }
  });

  return {
    navigation,
    kpi_options
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
  loadCampaign: PropTypes.func.isRequired,
  logout: PropTypes.func.isRequired
};

NavWrapper.defaultProps = {
  kpi_options: {}
};

export default connect(
  mapStateToProps,
  { ...navigationActions, loadCampaign, logout }
)(NavWrapper);

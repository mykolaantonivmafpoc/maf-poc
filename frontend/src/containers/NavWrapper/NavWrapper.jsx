import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import * as navigationActions from '../../actions/navigationActions';

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
  removeMainNav
}) => (
  <section>
    {navigation.navShown === undefined || navigation.navShown === true ? (
      <MainNav
        removeMainNav={removeMainNav}
        showMainNav={showMainNav}
        hideMainNav={hideMainNav}
        navShown={navigation.navShown}
      />
    ) : null}
    <MobileNav
      hideFilter={hideFilter}
      showFitler={showFitler}
      showMainNav={showMainNav}
      removeMainNav={removeMainNav}
      hideMainNav={hideMainNav}
    />
    {navigation.filterShown ? <Filter hideFilter={hideFilter} /> : null}
    <section className="main-c">
      {children}
    </section>
  </section>
);

const mapStateToProps = state => {
  const { navigation } = state;

  return { navigation };
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
  hideMainNav: PropTypes.func.isRequired
};

export default connect(
  mapStateToProps,
  navigationActions
)(NavWrapper);

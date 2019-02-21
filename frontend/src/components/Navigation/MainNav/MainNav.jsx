import React from 'react';
import PropTypes from 'prop-types';

import { Link } from 'react-router-dom';
import './MainNav.scss';
import cancel from './cancel-white.svg';
import mafLogo from './maf-logo.svg';

const MainNav = ({
  removeMainNav,
  showMainNav,
  hideMainNav,
  navShown,
  logout
}) => (
  <aside
    className={`left-menu-wrapper ${
      navShown === undefined ? 'nav-hidden' : 'nav-shown'
    }`}
  >
    <ul className="nav flex-column">
      <li className="nav-item logo">
        <Link to="/">
          <img alt="Majid Al Futtaim" className="maf-logo" src={mafLogo} />
        </Link>
        <span onClick={removeMainNav} className="close-btn float-right">
          <img alt="cancel" src={cancel} />
        </span>
      </li>
      <li className="nav-item dashboard">
        <Link to="/">Dashboard</Link>
      </li>
      <li className="nav-item campaigns">
        <Link to="/campaigns">Campaigns</Link>
      </li>
      <li className="nav-item value-based">
        <Link to="/">Value-based Section</Link>
      </li>
      <li className="nav-item user-settings small">
        <a href="#noacation">User Profile</a>
      </li>
      <li className="nav-item expand" onClick={showMainNav} />
      <li className="nav-item collapse" onClick={hideMainNav}>
        <a href="#noacation">Collapse Side Bar</a>
      </li>
      <li className="nav-item logout small" onClick={logout}>
        <a href="#noacation">Logout</a>
      </li>
    </ul>
  </aside>
);

MainNav.propTypes = {
  removeMainNav: PropTypes.func.isRequired,
  showMainNav: PropTypes.func.isRequired,
  hideMainNav: PropTypes.func.isRequired,
  navShown: PropTypes.bool,
  logout: PropTypes.func.isRequired
};

MainNav.defaultProps = {
  navShown: undefined
};

export default MainNav;

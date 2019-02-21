import React from 'react';
import PropTypes from 'prop-types';

import { Link } from 'react-router-dom';
import './MainNav.scss';
import cancel from './cancel-white.svg';

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
        <Link to="/">Majid Al Futtaim</Link>
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
      <li className="nav-item user-settings">
        <Link to="/">User Profile</Link>
      </li>
      <li className="nav-item increase-nav" onClick={showMainNav} />
      <li className="nav-item decrease-nav" onClick={hideMainNav}>
        Collapse Side Bar
      </li>
      <li className="nav-item logout" onClick={logout}>
        Logout
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

import React from 'react';
import PropTypes from 'prop-types';

import { Link } from 'react-router-dom';
import './MainNav.scss';
import cancel from './cancel-white.svg';

const MainNav = ({ removeMainNav, showMainNav, hideMainNav, navShown }) => (
  <aside
    className={`left-menu-wrapper ${
      navShown === undefined ? 'nav-hidden' : 'nav-shown'
    }`}
  >
    <ul className="nav flex-column">
      <li className="nav-item">
        <Link to="/" />
        <span
          onClick={window.innerWidth > 1024 ? hideMainNav : removeMainNav}
          className="close-nav-btn float-right"
        >
          <img alt="" src={cancel} />
        </span>
      </li>
      <li className="nav-item">
        <Link to="/">Dashboard</Link>
      </li>
      <li className="nav-item">
        <Link to="/campaigns">Campaigns</Link>
      </li>
      <li className="nav-item">
        <Link to="/campaigns">User Settigns</Link>
      </li>
      <li className="nav-item">
        <Link to="/campaigns">Log out</Link>
      </li>
    </ul>

    {navShown === undefined && (
      <button type="submit" onClick={showMainNav}>
        Show
      </button>
    )}

    {navShown === true && window.innerWidth > 320 && (
      <button type="submit" onClick={hideMainNav}>
        Hide
      </button>
    )}
  </aside>
);

MainNav.propTypes = {
  removeMainNav: PropTypes.func.isRequired,
  showMainNav: PropTypes.func.isRequired,
  hideMainNav: PropTypes.func.isRequired,
  navShown: PropTypes.bool
};

MainNav.defaultProps = {
  navShown: undefined
};

export default MainNav;

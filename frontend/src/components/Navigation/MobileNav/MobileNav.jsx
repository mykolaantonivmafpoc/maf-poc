import React, { Component } from 'react';
import PropTypes from 'prop-types';

import './MobileNav.scss';
import { Link } from 'react-router-dom';
import hamburger from './hamburger-menu-icon.svg';
import logo from './logo.png';
import filter from './filter-white.svg';

class MobileNav extends Component {
  static propTypes = {
    hideFilter: PropTypes.func.isRequired,
    showFitler: PropTypes.func.isRequired,
    removeMainNav: PropTypes.func.isRequired,
    showMainNav: PropTypes.func.isRequired,
    hideMainNav: PropTypes.func.isRequired
  };

  constructor() {
    super();
    this.window = window;
  }

  componentWillMount() {
    const { showFitler, hideFilter, hideMainNav, removeMainNav } = this.props;

    if (this.window.innerWidth < 1024) {
      hideFilter();
      removeMainNav();
    }

    this.window.onresize = event => {
      if (event.target.innerWidth <= 1024) {
        hideFilter();
        removeMainNav();
      } else {
        showFitler();
        hideMainNav();
      }
    };
  }

  componentWillUnmount() {
    this.window.onresize = null;
  }

  render() {
    const { showFitler, showMainNav } = this.props;
    return (
      <header className="mobile-nav-wrapper">
        <ul>
          <li
            onClick={showMainNav}
            className="nav-link text-center image-wrapper float-left"
          >
            <img alt="" src={hamburger} />
          </li>
          <li className="nav-link text-center image-wrapper">
            <Link to="/campaigns">
              <img alt="" src={logo} />
            </Link>
          </li>
          <li
            onClick={showFitler}
            className="nav-link text-center image-wrapper float-right"
          >
            <img alt="" src={filter} />
          </li>
        </ul>
      </header>
    );
  }
}

export default MobileNav;

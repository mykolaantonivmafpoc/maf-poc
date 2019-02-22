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

  DEBOUNCE_TIME = 200;

  constructor() {
    super();
    this.window = window;
  }

  componentWillMount() {
    const width = this.window.innerWidth;
    this.onWindowResize(width);
    this.window.onresize = (event) => {
      const windowWidth = event.target.innerWidth;

      this.debounceWindowResize(windowWidth, this.onWindowResize);
    };
  }

  componentWillUnmount() {
    this.window.onresize = null;
  }

  debounceWindowResize = (windowWidth, callBack) => {
    clearTimeout(this.debounceTimeOut);

    this.debounceTimeOut = setTimeout(() => {
      this.debounceTimeOut = 0;
      callBack(windowWidth);
    }, this.DEBOUNCE_TIME);
  }

  onWindowResize = windowWidth => {
    const { showFitler, hideMainNav, hideFilter, removeMainNav } = this.props;

    if (windowWidth <= 1024) {
      hideFilter();
      removeMainNav();
    } else {
      showFitler();
      hideMainNav();
    }
  };

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

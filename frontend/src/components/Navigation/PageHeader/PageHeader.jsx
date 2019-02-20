import React from 'react';
import { Link } from 'react-router-dom';
import './PageHeader.scss';
import PropTypes from 'prop-types';

class PageHeader extends React.Component {
  static propTypes = {
    pageTitle: PropTypes.string,
    filters: PropTypes.shape({
      visible: PropTypes.bool,
      content: PropTypes.shape({})
    })
  }

  static defaultProps = {
    pageTitle: '',
    filters: {
      visible: false
    }
  };

  getPageTitleElement = (pageTitle, filters) => {
    let titleElement;

    if (filters.visible) {
      titleElement = (
        <div>
          <Link className="small-title" to="/campaigns">{pageTitle}</Link>
          {filters.content}
        </div>
      );
    } else {
      titleElement = (
        <h1 className="largeTitle">{pageTitle}</h1>
      );
    }

    return (
      <div className="title-wrapper">
        {titleElement}
      </div>
    );
  }

  render() {
    const { pageTitle, filters } = this.props;
    const titleElement = this.getPageTitleElement(pageTitle, filters);

    return (
      <header className="page-header">
        {titleElement}
        <button className="button-search" type="button" />
      </header>
    );
  }
}

export default PageHeader;

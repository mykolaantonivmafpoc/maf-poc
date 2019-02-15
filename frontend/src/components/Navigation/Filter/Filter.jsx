import React from 'react';
import PropTypes from 'prop-types';

import './Filter.scss';
import cancel from './cancel.svg';
import filter from './filter.svg';

const Filter = ({ hideFilter }) => (
  <aside className="filters-wrapper float-right">
    <header className="filters-header">
      <img alt="" src={filter} className="filters-label-image" />
      <span className="filters-label heading align-middle">Filters</span>
      <span className="close-btn" onClick={hideFilter}>
        <img alt="" src={cancel} className="cancel-button-image float-right" />
      </span>
    </header>
    <form className="filter-body">
      <fieldset className="form-group">
        <label htmlFor="department" className="filters-label">
          Department
        </label>
        <select
          className="form-control"
          name="department"
          id="department"
          placeholder="Select"
        >
          <option>Select</option>
        </select>
      </fieldset>
      <fieldset className="form-group">
        <label htmlFor="department" className="filters-label">
          Section
        </label>
        <select className="form-control" placeholder="Select">
          <option>Select</option>
        </select>
      </fieldset>
      <fieldset className="form-group">
        <label htmlFor="department" className="filters-label">
          Family
        </label>
        <select className="form-control" placeholder="Select">
          <option>Select</option>
        </select>
      </fieldset>
      <fieldset className="form-group">
        <label htmlFor="department" className="filters-label">
          Subfamily
        </label>
        <select className="form-control" placeholder="Select">
          <option>Select</option>
        </select>
      </fieldset>
      <fieldset className="datepicker-wrapper col-6 pl-0 float-left">
        <label htmlFor="fromDate">From</label>
        <input
          name="fromDate"
          type="date"
          className="form-control"
        />
      </fieldset>
      <fieldset className="datepicker-wrapper col-6 pr-0 float-right">
        <label htmlFor="toDate">To</label>
        <input
          type="date"
          name="toDate"
          id="toDate"
          className="form-control"
        />
      </fieldset>

      <div className="buttons-wrapper clearfix">
        <button type="submit" className="custom-button apply">Apply</button>
        <button className="custom-button clear float-right" type="button">Clear</button>
      </div>
    </form>
  </aside>
);

Filter.propTypes = {
  hideFilter: PropTypes.func.isRequired
};


export default Filter;

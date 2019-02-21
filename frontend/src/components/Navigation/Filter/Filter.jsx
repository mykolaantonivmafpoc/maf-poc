import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';

import './Filter.scss';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import cancel from './cancel.svg';
import filter from './filter.svg';

const emptyState = {
  department: '',
  family_categor: '',
  section: '',
  sub_family_category: ''
};

class Filter extends Component {
  static propTypes = {
    hideFilter: PropTypes.func.isRequired,
    options: PropTypes.shape({}).isRequired,
    filterAction: PropTypes.func.isRequired,
    match: PropTypes.shape({}).isRequired,
  };

  state = emptyState;

  constructor(props) {
    super(props);
    this.reset = this.reset.bind(this);
    this.filter = this.filter.bind(this);
    this.setStateVal = this.setStateVal.bind(this);
  }

  setStateVal(event) {
    const { target } = event;
    this.setState({
      [target.name]: target.value
    });
  }

  filter() {
    const {
      filterAction,
      match: {
        params: { id }
      }
    } = this.props;
    const filterObj = {};
    Object.keys(this.state).forEach(k => {
      const { [k]: param } = this.state;
      if (param !== '') {
        filterObj[k] = param;
      }
    });
    filterAction(filterObj, id);
  }

  reset() {
    this.setState(emptyState);
  }

  render() {
    const { hideFilter, options } = this.props;
    const {
      department,
      family_category,
      section,
      sub_family_category
    } = this.state;
    return (
      <aside className="filters-wrapper float-right">
        <header className="filters-header">
          <img alt="" src={filter} className="filters-label-image" />
          <span className="filters-label heading align-middle">Filters</span>
          <span className="close-btn" onClick={hideFilter}>
            <img
              alt=""
              src={cancel}
              className="cancel-button-image float-right"
            />
          </span>
        </header>
        <Form className="filter-body">
          <Form.Group className="form-group">
            <Form.Label htmlFor="department" className="filters-label">
              Department
            </Form.Label>
            <Form.Control
              as="select"
              className="form-control"
              name="department"
              id="department"
              onChange={this.setStateVal}
              value={department}
            >
              <option value="">Select</option>
              {options.department
                && options.department.map(o => (
                  <option key={o.id} value={o.id}>
                    {o.name}
                  </option>
                ))}
            </Form.Control>
          </Form.Group>
          <Form.Group className="form-group">
            <Form.Label htmlFor="section" className="filters-label">
              Section
            </Form.Label>
            <Form.Control
              as="select"
              className="form-control"
              name="section"
              id="section"
              placeholder="Select"
              onChange={this.setStateVal}
              value={section}
            >
              <option value="">Select</option>
              {options.section
                && options.section.map(o => (
                  <option key={o.id} value={o.id}>
                    {o.name}
                  </option>
                ))}
            </Form.Control>
          </Form.Group>
          <Form.Group className="form-group">
            <Form.Label htmlFor="family_category" className="filters-label">
              Family
            </Form.Label>
            <Form.Control
              as="select"
              className="form-control"
              placeholder="Select"
              name="family_category"
              id="family_category"
              onChange={this.setStateVal}
              value={family_category}
            >
              <option value="">Select</option>
              {options.family_category
                && options.family_category.map(o => (
                  <option key={o.id} value={o.id}>
                    {o.name}
                  </option>
                ))}
            </Form.Control>
          </Form.Group>
          <Form.Group className="form-group">
            <Form.Label htmlFor="sub_family_category" className="filters-label">
              Subfamily
            </Form.Label>
            <Form.Control
              as="select"
              className="form-control"
              placeholder="Select"
              name="sub_family_category"
              id="sub_family_category"
              onChange={this.setStateVal}
              value={sub_family_category}
            >
              <option value="">Select</option>
              {options.sub_family_category
                && options.sub_family_category.map(o => (
                  <option key={o.id} value={o.id}>
                    {o.name}
                  </option>
                ))}
            </Form.Control>
          </Form.Group>
          <Form.Group className="datepicker-wrapper col-6 pl-0 float-left from-date">
            <Form.Label htmlFor="fromDate">From</Form.Label>
            <Form.Control name="fromDate" type="date" />
          </Form.Group>
          <Form.Group className="datepicker-wrapper col-6 pr-0 float-right to-date">
            <Form.Label htmlFor="toDate">To</Form.Label>
            <Form.Control
              type="date"
              name="toDate"
              id="toDate"
            />
          </Form.Group>
          <div className="buttons-wrapper clearfix">
            <Button
              type="button"
              className="custom-button btn-dark"
              onClick={this.filter}
            >
              Apply
            </Button>
            <Button
              className="custom-button btn-light float-right"
              type="button"
              onClick={this.reset}
            >
              Clear
            </Button>
          </div>
        </Form>
      </aside>
    );
  }
}

export default withRouter(Filter);

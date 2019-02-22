import React from 'react';
import { InputGroup, FormControl, ListGroup } from 'react-bootstrap';
import PropTypes from 'prop-types';

import './SearchableComboList.scss';

const DEBOUNCE_TIME = 200;

class SearchableComboList extends React.Component {
  static propTypes = {
    data: PropTypes.arrayOf(PropTypes.shape({})),
    itemWrapper: PropTypes.func,
    onItemSelected: PropTypes.func
  }

  static defaultProps = {
    data: [],
    itemWrapper: (content) => content,
    onItemSelected: () => {}
  };

  constructor(props) {
    super(props);
    const { data } = this.props;

    this.state = {
      filteredOptions: data,
      query: '',
      selectedId: undefined
    };

    this.ref_Input = React.createRef();
  }

  onSerachQueryChanged = (e) => {
    const { value } = e.target;
    clearTimeout(this.debounceTimeout);

    this.debounceTimeout = setTimeout(() => {
      this.filterListByQuery(value);
    }, DEBOUNCE_TIME);
  }

  onItemSelected = (e) => {
    const { onItemSelected: parentFunc } = this.props;
    const { id } = e.target.closest('.searchable-combo-item').dataset;

    parentFunc(id);
  }

  getAllOptions() {
    const { filteredOptions, selectedId } = this.state;
    const { itemWrapper } = this.props;
    const optionsToShow = filteredOptions.map(
      (item) => {
        const isActive = {};

        if (selectedId === item.id) {
          isActive.active = 'active';
        }

        return (
          <div className="searchable-combo-item" onClick={this.onItemSelected} key={item.id} data-id={item.id}>
            {itemWrapper(item.name, item.id)}
          </div>
        );
      }
    );

    return (
      <ListGroup className="combo-list" >
        {optionsToShow}
      </ListGroup>
    );
  }

  filterListByQuery = (query) => {
    const { data } = this.props;

    const filteredOptions = data.filter((item) => {
      const dataValue = item.name.toLowerCase();

      return dataValue.indexOf(query.toLowerCase()) !== -1;
    });

    this.setState({ filteredOptions, query });
  }

  AppendInput = () => {
    let conetnt;
    const { query } = this.state;

    if (query) {
      conetnt = (
        <button type="button" className="clear-button" onClick={this.onQueryCleared}/>
      );
    } else {
      conetnt = (
        <div className="search-icon"/>
      );
    }

    return (
      <InputGroup.Append>
        {conetnt}
      </InputGroup.Append>
    );
  }

  onQueryCleared = () => {
    const { current: inputElement } = this.ref_Input;

    this.setState({ query: '' });
    inputElement.value = '';
    this.onSerachQueryChanged({ target: inputElement });
    inputElement.focus();
  }

  render() {
    return (
      <div className="searchable-combo-list">
        <div className="search-wrapper">
          <InputGroup >
            <FormControl
              className="search-input"
              placeholder="Campaigns Search"
              onChange={this.onSerachQueryChanged}
              ref={this.ref_Input}
              autoFocus
            />
            <this.AppendInput/>
          </InputGroup>
        </div>
        {this.getAllOptions()}
      </div>
    );
  }
}

export default SearchableComboList;

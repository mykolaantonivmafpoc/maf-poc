import React from 'react';
import { Button, OverlayTrigger, Popover } from 'react-bootstrap';
import PropTypes from 'prop-types';
import SearchableComboList from '../SearchableComboList/SearchableComboList';
import './CampaignsListFilter.scss';

class CampaignsListFilter extends React.Component {
  static propTypes = {
    onFilterChange: PropTypes.func,
    campaigns: PropTypes.arrayOf(PropTypes.shape({})),
    selectedCampaignName: PropTypes.string
  }

  static defaultProps = {
    onFilterChange: () => {},
    campaigns: [],
    selectedCampaignName: ''
  };

  constructor(props) {
    super(props);

    this.state = {
      showPopover: false,
      selectedId: -1
    };

    this.ref_Overlay = React.createRef();
  }

  onFilterClicked = ({ target }) => {
    const { showPopover } = this.state;

    this.setState({ target, showPopover: !showPopover });
  }

  onCampaignSelect = (id) => {
    this.setState({ selectedId: id });
  }

  onSelectClicked = () => {
    const { selectedId } = this.state;
    const { onFilterChange } = this.props;

    onFilterChange(selectedId);
    this.closePopOver();
  }

  closePopOver = () => {
    this.setState({ showPopover: false });
    this.ref_Overlay.current.hide();
  }

  render() {
    const { showPopover, target } = this.state;
    const { campaigns, selectedCampaignName } = this.props;

    return (
      <div className="campaigns-list-filter">
        <OverlayTrigger
          show={showPopover}
          target={target}
          trigger="click"
          placement="bottom-start"
          container={this}
          ref={this.ref_Overlay}
          overlay={(
            <Popover id="popover-contained">
              <div className="popover-wrapper">
                <SearchableComboList data={campaigns} onSelect={this.onCampaignSelect}/>
                <div className="buttons-wrapper">
                  <Button variant="dark" className="button-select" onClick={this.onSelectClicked}>Select</Button>
                  <Button variant="light" className="button-cancel" onClick={this.closePopOver}>Cancel</Button>
                </div>
              </div>
            </Popover>
          )}
        >
          <button className="filter-title" data-active={showPopover} type="button" onClick={this.onFilterClicked}>
            {selectedCampaignName}
          </button>
        </OverlayTrigger>
      </div>
    );
  }
}

export default CampaignsListFilter;

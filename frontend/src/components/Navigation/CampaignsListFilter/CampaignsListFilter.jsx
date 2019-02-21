import React from 'react';
import { OverlayTrigger, Popover } from 'react-bootstrap';
import PropTypes from 'prop-types';
import SearchableComboList from '../SearchableComboList/SearchableComboList';
import './CampaignsListFilter.scss';

class CampaignsListFilter extends React.Component {
  static propTypes = {
    campaigns: PropTypes.arrayOf(PropTypes.shape({})),
    selectedCampaignName: PropTypes.string
  }

  static defaultProps = {
    campaigns: [],
    selectedCampaignName: ''
  };

  constructor(props) {
    super(props);

    this.state = {
      showPopover: false
    };

    this.ref_Overlay = React.createRef();
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
                <SearchableComboList data={campaigns}/>
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

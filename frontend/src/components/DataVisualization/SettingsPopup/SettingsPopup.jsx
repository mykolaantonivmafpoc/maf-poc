import React, { Component } from 'react';
import { Button, Popover, Form, Col, Row, Overlay } from 'react-bootstrap';
import { PropTypes } from 'prop-types';

import './SettingsPopup.scss';

class SettingsPopup extends Component {
  static propTypes = {
    onChange: PropTypes.func.isRequired,
    kpi: PropTypes.shape({}),
    x: PropTypes.string.isRequired,
    y: PropTypes.string.isRequired,
  }

  static defaultProps = {
    kpi: {}
  }

  constructor(props) {
    super(props);
    const { x, y } = props;
    this.state = { x, y, show: false };
    this.setX = this.setX.bind(this);
    this.setY = this.setY.bind(this);
    this.apply = this.apply.bind(this);
    this.close = this.close.bind(this);
    this.toggleShown = this.toggleShown.bind(this);
  }

  setX(e) {
    this.setState({
      x: e.target.value
    });
  }

  setY(e) {
    this.setState({
      y: e.target.value
    });
  }

  toggleShown({ target }) {
    this.setState(s => ({ target, show: !s.show }));
  }

  close() {
    this.setState({
      show: false
    });
  }

  apply() {
    const { onChange } = this.props;
    const { x, y } = this.state;
    onChange({ x, y });
    this.close();
  }

  render() {
    const { kpi } = this.props;
    const { x, y, show, target } = this.state;
    const options = Object.entries(kpi).map(([k]) => k);
    const popover = (
      <Popover id="dialog-body">
        <Form>
          <Form.Group controlId="selectX">
            <Row>
              <Form.Label column xs="1">X</Form.Label>
              <Col xs="10">
                <Form.Control as="select" onChange={this.setX} value={x}>
                  {options.map(k => {
                    return (<option key={k} value={k}>{k}</option>);
                  })}
                </Form.Control>
              </Col>
            </Row>
          </Form.Group>
          <Form.Group controlId="selectY">
            <Row>
              <Form.Label column xs="1">
                Y
              </Form.Label>
              <Col xs="10">
                <Form.Control as="select" onChange={this.setY} value={y}>
                  {options.map(k => {
                    return (<option key={k} value={k}>{k}</option>);
                  })}
                </Form.Control>
              </Col>
            </Row>
          </Form.Group>
          <Row>
            <Col xs="1"/>
            <Col xs="10">
              <Button variant="dark" className="custom-button apply" onClick={this.apply}>
                APPLY
              </Button>
              <Button variant="outline-dark" className="custom-button clear" onClick={this.close}>
                CANCEL
              </Button>
            </Col>
          </Row>
        </Form>
      </Popover>
    );

    return (
      <div className="settings-popup">
        <Button className="btn-settings" variant="link" onClick={this.toggleShown} />
        <Overlay
          show={show}
          target={target}
          placement="bottom-end"
          container={this}
          containerPadding={20}
        >
          {popover}
        </Overlay>
      </div>
    );
  }
}

export default SettingsPopup;

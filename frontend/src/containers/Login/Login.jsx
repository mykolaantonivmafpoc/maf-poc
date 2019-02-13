import React, { Component } from 'react';

import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import FormControl from 'react-bootstrap/FormControl';
import FormCheck from 'react-bootstrap/FormCheck';

import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { authenticate } from '../../actions/userActions';

import './Login.css';
import logo from './logo.png';

class Login extends Component {
  static propTypes = {
    login: PropTypes.shape({
      username: PropTypes.string,
      password: PropTypes.string,
      authdata: PropTypes.string
    }),
    location: PropTypes.shape({
      state: PropTypes.shape({
        from: PropTypes.shape({})
      })
    }).isRequired,
    authenticate: PropTypes.func.isRequired
  };

  static defaultProps = {
    login: null
  };

  state = {
    username: '',
    password: '',
    validated: false
  };

  login = (event) => {
    const { authenticate: auth } = this.props;
    const { username, password } = this.state;

    auth({ username, password });

    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    }
    this.setState({ validated: true });
  };

  handleChange = event => {
    this.setState({
      [event.target.name]: event.target.value
    });
  };

  render() {
    const { login, location: { state } } = this.props;
    const { from } = state || { from: { pathname: '/' } };
    const { username, password, validated } = this.state;

    if (login && login.authdata) {
      return <Redirect to={from} />;
    }

    return (
      <section className="login-wrapper">
        <Form className="form-signin" validated={validated} noValidate>
          <img className="mb-4" src={logo} alt="" width="72" height="72"/>
          <h1 className="h3 mb-3 font-weight-normal">Please sign in</h1>
          <div>
            <Form.Group>
              <Form.Label htmlFor="inputUsername" className="sr-only">Username</Form.Label>
              <FormControl
                type="text"
                placeholder="Username"
                id="inputUsername"
                name="username"
                required
                value={username}
                onChange={this.handleChange}
              />
              <Form.Label htmlFor="inputPassword" className="sr-only">Password</Form.Label>
              <FormControl
                type="password"
                placeholder="Password"
                id="inputPassword"
                name="password"
                required
                value={password}
                onChange={this.handleChange}
              />
              <Form.Control.Feedback type="invalid">
                Please provide valid credentials.
              </Form.Control.Feedback>
            </Form.Group>
            <Form.Group className="ml-1 mt-4 mb-4">
              <FormCheck>
                <FormCheck.Input className="custom-control-input" id="my-check"/>
                <FormCheck.Label htmlFor="my-check" className="custom-control-label">Rembember Me</FormCheck.Label>
              </FormCheck>
            </Form.Group>
            <Button
              className="btn btn-lg btn-primary btn-block"
              type="button"
              onClick={(e) => this.login(e)}
            >
              Sign in
            </Button>
          </div>
        </Form>
      </section>
    );
  }
}

const mapStateToProps = (state) => {
  const {
    login
  } = state;
  return {
    login
  };
};

const mapDispatchToProps = {
  authenticate
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);

import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import Root from './containers/Root';
import configureStore from './store/configureStore';

import 'bootstrap/dist/css/bootstrap.css';
import './theme.scss';
import './App.scss';

const store = configureStore();

const App = () => (
  <Router>
    <Root store={store} />
  </Router>
);

export default App;

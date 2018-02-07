import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { ConnectedRouter } from 'react-router-redux';
import PrismicWrapper from './prismic/PrismicWrapper';
import store, { history } from './configureStore';
import './index.css';

render(
  <Provider store={store}>
    <ConnectedRouter history={history}>
      <PrismicWrapper />
    </ConnectedRouter>
  </Provider>,
  document.getElementById('root')
);

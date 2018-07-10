import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { ConnectedRouter } from 'react-router-redux';
import ScrollToTop from './components/ScrollToTop';
import PrismicWrapper from './prismic/PrismicWrapper';
import store, { history } from './configureStore';
import './utils/globalStyles';

render(
  <Provider store={store}>
    <ConnectedRouter history={history}>
      <ScrollToTop>
        <PrismicWrapper />
      </ScrollToTop>
    </ConnectedRouter>
  </Provider>,
  document.getElementById('root')
);

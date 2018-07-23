import React from 'react';
import Routes from './Routes';
import NavBar from '../components/NavBar';
import Footer from '../components/Footer';
import AdminBar from '../components/admin/AdminBar';
import styled from 'styled-components';
import { constants } from '../style';
import { StripeProvider, Elements } from 'react-stripe-elements';

const Main = styled.main`
  margin-top: ${constants.navHeight};
  min-height: calc(
    100vh - ${constants.navHeight} - ${constants.footerMinHeight}
  );
`;
const App = props => {
  return (
    <React.Fragment>
      <NavBar prismicCtx={props.prismicCtx} uid="nav" />
      <AdminBar />
      <Main>
        <StripeProvider apiKey="pk_live_SERz3pidRlXxZYu8LR7oCu26">
          <Elements>
            <Routes prismicCtx={props.prismicCtx} />
          </Elements>
        </StripeProvider>
      </Main>
      {!window.location.pathname.match('trips') && (
        <Footer prismicCtx={props.prismicCtx} uid="footer" />
      )}
    </React.Fragment>
  );
};

export default App;

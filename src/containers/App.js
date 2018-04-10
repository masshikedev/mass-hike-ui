import React from 'react';
import Routes from './Routes';
import NavBar from '../components/NavBar';
import Footer from '../components/Footer';
import AdminBar from '../components/admin/AdminBar';
import styled from 'styled-components';
import { constants } from '../style';

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
        <Routes prismicCtx={props.prismicCtx} />
      </Main>
      {!window.location.pathname.match('trips') && (
        <Footer prismicCtx={props.prismicCtx} uid="footer" />
      )}
    </React.Fragment>
  );
};

export default App;

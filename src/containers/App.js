import React from 'react';
import Routes from './Routes';
import NavBar from '../components/NavBar';
import Footer from '../components/Footer';
import AdminBar from '../components/admin/AdminBar';
import { StripeProvider, Elements } from 'react-stripe-elements';

const App = props => {
  return (
    <div>
      <NavBar prismicCtx={props.prismicCtx} uid="nav" />
      <AdminBar />
      <main>
        <StripeProvider apiKey="pk_test_gdoocVed0AjapcCEvNtTQqt5">
          <Elements>
            <Routes prismicCtx={props.prismicCtx} />
          </Elements>
        </StripeProvider>
      </main>
      <Footer prismicCtx={props.prismicCtx} uid="footer" />
    </div>
  );
};

export default App;

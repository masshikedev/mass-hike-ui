import React from 'react';
import Routes from './Routes';
import NavBar from '../components/NavBar';
import Footer from '../components/Footer';
import AdminBar from '../components/admin/AdminBar';

const App = props => {
  return (
    <div>
      <NavBar prismicCtx={props.prismicCtx} uid="nav" />
      <AdminBar />
      <main>
        <Routes prismicCtx={props.prismicCtx} />
      </main>
      <Footer prismicCtx={props.prismicCtx} uid="footer" />
    </div>
  );
};

export default App;

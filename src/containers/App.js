import React from 'react';
import Routes from './Routes';
import NavBar from '../components/NavBar';
import ContactFooter from '../components/home/ContactFooter';

const App = props => {
  return (
    <div>
      <NavBar prismicCtx={props.prismicCtx} uid="nav" />
      <main>
        <Routes prismicCtx={props.prismicCtx} />
      </main>
    </div>
  );
};

export default App;

import React from 'react';
import Routes from './Routes';
import NavBar from '../components/NavBar';

const App = props => {
  return (
    <div>
      <NavBar />
      <main>
        <Routes prismicCtx={props.prismicCtx} />
      </main>
    </div>
  );
};

export default App;

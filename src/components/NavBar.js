import React from 'react';
import { Link } from 'react-router-dom';

const NavBar = props => {
  return (
    <header>
      <h3>Mass Hike</h3>
      <ul>
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/trips">Trips</Link>
        </li>
      </ul>
    </header>
  );
};

export default NavBar;

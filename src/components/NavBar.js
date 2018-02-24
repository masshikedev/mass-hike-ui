import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { H2, H3, P, Img } from '../style';

const Nav = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  top: 0;
  position: fixed;
  background: white;
`;

const NavItem = styled.div`
  display: block;
  padding: 10px;
`;

const NavLeft = styled.div`
  display: flex;
  flex: 7;
`;

const NavRight = styled.div`
  display: flex;
  flex-direction: row-reverse;
  flex: 3;
`;

const NavBar = props => {
  return (
    <Nav>
      <NavLeft>
        <NavItem>
          <H3>
            <Link to="/">Mass Hike</Link>
          </H3>
        </NavItem>
      </NavLeft>
      <NavRight>
        <NavItem>
          <H3>
            <Link to="/trips">Book a trip</Link>
          </H3>
        </NavItem>
        <NavItem>
          <H3>
            <Link to="/">About</Link>
          </H3>
        </NavItem>
      </NavRight>
    </Nav>
  );
};

export default NavBar;

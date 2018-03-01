import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import hamburger from '../images/hamburger.png';
import { H2, H3, P, Img, MediaQueries } from '../style';

const Nav = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  top: 0;
  position: fixed;
  border-bottom: solid;
  background: white;
`;

const NavItem = styled.div`
  display: block;
  padding: 10px;
`;

const NavLeft = styled.div`
  display: flex;
  flex: 6;
`;

const NavRight = styled.div`
  display: flex;
  flex-direction: row-reverse;
  flex: 4;
  ${MediaQueries.small} {
    display: none;
  }
`;

const Hamburger = styled.div`
  display: flex;
  flex-direction: row-reverse;
  flex: 0.5;
  display: none;

  ${MediaQueries.small} {
    display: block;
  }
`;

function NavBar(props) {
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
            <Link to="/impact">Impact</Link>
          </H3>
        </NavItem>
        <NavItem>
          <H3>
            <Link to="/about">About</Link>
          </H3>
        </NavItem>
      </NavRight>
      <Hamburger>
        <Img src={hamburger} />
      </Hamburger>
    </Nav>
  );
}

export default NavBar;

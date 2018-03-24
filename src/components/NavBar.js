import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import PrismicPage from '../prismic/PrismicPage';
import hamburger from '../images/hamburger.png';
import renderLinkSlices from '../utils/renderLinkSlices';
import { RichText } from 'prismic-reactjs';
import { H2, H3, P, Img, MediaQueries } from '../style';

const Nav = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  top: 0;
  position: fixed;
  background: white;
  box-shadow: 0 2px 25px 0 rgba(51, 51, 51, 0.28);
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
  flex-direction: row;
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

class NavBar extends Component {
  static pageType = 'header';

  renderNavLinks(links) {
    const navLinks = links.map(link => {
      return <NavItem>{link}</NavItem>;
    });
    return navLinks;
  }

  render() {
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
          {this.renderNavLinks(renderLinkSlices(this.props.doc.data.body))}
        </NavRight>
        <Hamburger>
          <Img src={hamburger} />
        </Hamburger>
      </Nav>
    );
  }
}

export default PrismicPage(NavBar);

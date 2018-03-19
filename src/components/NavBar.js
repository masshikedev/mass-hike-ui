import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import PrismicPage from '../prismic/PrismicPage';
import hamburger from '../images/hamburger.png';
import { RichText } from 'prismic-reactjs';
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
        <NavRight>{this.renderNavLinks()}</NavRight>
        <Hamburger>
          <Img src={hamburger} />
        </Hamburger>
      </Nav>
    );
  }

  renderNavLinks() {
    const body = this.props.doc.data.body;
    const navLinks = body.map(link => {
      if (link.slice_type === 'nav_link') {
        if (link.primary.destination.uid) {
          const destination = '/' + link.primary.destination.uid;
          return (
            <NavItem>
              <H3>
                <Link to={destination}>
                  {RichText.asText(link.primary.label)}
                </Link>
              </H3>
            </NavItem>
          );
        } else {
          return (
            <NavItem>
              <H3>
                <a href={link.primary.destination.url}>
                  {RichText.asText(link.primary.label)}
                </a>
              </H3>
            </NavItem>
          );
        }
      }
    });
    return navLinks;
  }
}

export default PrismicPage(NavBar);

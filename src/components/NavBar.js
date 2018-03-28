import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import PrismicPage from '../prismic/PrismicPage';
import hamburger from '../images/hamburger.png';
import renderLinkSlices from '../utils/renderLinkSlices';
import { RichText } from 'prismic-reactjs';
import { H3, P, Button, Img, MediaQueries } from '../style';
import logo from '../images/mh_large.png';

const Nav = styled.div`
  display: flex;
  align-items: center;
  z-index: 20;
  width: 100%;
  top: 0;
  position: fixed;
  background: white;
  box-shadow: 0 2px 25px 0 rgba(51, 51, 51, 0.28);
`;

const NavItem = styled.div`
  display: block;
  margin: 10px;
`;

const Logo = Img.extend`
  height: 60px;
  width: 60px;

  ${MediaQueries.small} {
    width: 43px;
    height: 43px;
  }
`;

const NavLeft = styled.div`
  display: flex;
  flex: 6;
  font-family: 'proxima-soft';
  font-weight: 700;
`;

const NavRight = styled.div`
  display: flex;
  flex-direction: row;
  font-family: 'proxima-nova';
  font-size: 16px;
  font-weight: bold;

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
      if (link.props.to === '/trips') {
        return (
          <Button primary small>
            {link}
          </Button>
        );
      } else {
        return <NavItem>{link}</NavItem>;
      }
    });
    return navLinks;
  }

  render() {
    const { loggedIn } = this.props;
    return (
      <Nav>
        <NavLeft>
          <Link to="/">
            <Logo src={logo} />
          </Link>
          <NavItem>
            <H3>
              <Link to="/">Mass Hike</Link>
            </H3>
          </NavItem>
        </NavLeft>
        <NavRight>
          {loggedIn && (
            <NavItem>
              <H3>
                <Link to="/admin">Admin</Link>
              </H3>
            </NavItem>
          )}
          {renderLinkSlices(this.props.doc.data.body, NavItem)}
        </NavRight>
        <Hamburger>
          <Img src={hamburger} />
        </Hamburger>
      </Nav>
    );
  }
}

const mapStateToProps = state => ({
  loggedIn: state.auth.isAuthenticated,
});

const connected = connect(mapStateToProps)(NavBar);
export default PrismicPage(connected);

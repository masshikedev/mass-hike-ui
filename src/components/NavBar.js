import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import PrismicPage from '../prismic/PrismicPage';
import hamburger from '../images/hamburger.png';
import renderLinkSlices from '../utils/renderLinkSlices';
import { A, constants, H3, Button, Img, MediaQueries } from '../style';
import logo from '../images/mh_large.png';

const NavLink = A.extend`
  color: ${({ color }) => color || 'black'};
  margin: 20px;
`;

const Nav = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 20;
  display: flex;
  align-items: center;
  padding: 0 20px;
  background: white;
  height: ${constants.navHeight};
  transition: box-shadow 0.1s ease;
  box-shadow: ${({ scrolledToTop }) =>
    scrolledToTop ? 'none' : constants.boxshadow};
`;

const Logo = Img.extend`
  height: 60px;
  width: 60px;

  ${MediaQueries.small} {
    width: 43px;
    height: 43px;
  }
`;

const LogoMark = styled.div`
  display: flex;
  align-items: center;

  a {
    font-family: 'proxima-soft';
    font-weight: 700;
    text-transform: uppercase;
    font-size: 36px;
  }
`;

const NavLeft = styled.div`
  display: flex;
  flex: 6;
`;

const NavRight = styled.div`
  display: flex;
  flex-direction: row;
  font-family: 'proxima-nova';
  font-size: 16px;
  font-weight: bold;
  max-height: 40px;
  align-items: center;

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

  constructor(props) {
    super(props);
    this.state = {
      scrolledToTop: true,
    };
    this.listener = document.addEventListener('scroll', () => {
      if (window.scrollY) {
        this.setState({ scrolledToTop: false });
      } else {
        this.setState({ scrolledToTop: true });
      }
    });
  }

  componentWillUnmount() {
    document.removeEventListener('scroll', this.listener);
  }

  renderNavLinks = links =>
    links.map(link => {
      if (link.props.children.props.to === '/trips') {
        return (
          <Button key="cta">
            <A color="white" href={link.props.children.props.to}>
              {link.props.children.props.children}
            </A>
          </Button>
        );
      } else {
        return link;
      }
    });

  render() {
    const { loggedIn } = this.props;
    return (
      <Nav scrolledToTop={this.state.scrolledToTop}>
        <NavLeft>
          <Link to="/">
            <LogoMark>
              <Logo src={logo} />
              <NavLink>Mass Hike</NavLink>
            </LogoMark>
          </Link>
        </NavLeft>
        <NavRight>
          {loggedIn && (
            <Link to="/admin">
              <NavLink>Admin</NavLink>
            </Link>
          )}
          {this.renderNavLinks(
            renderLinkSlices(this.props.doc.data.body, NavLink)
          )}
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

import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Link } from 'react-router-dom';
import { push } from 'react-router-redux';
import styled from 'styled-components';
import PrismicPage from '../prismic/PrismicPage';
import MobileNav from './MobileNav';
import hamburger from '../images/hamburger.png';
import xIcon from '../images/mobile_nav_x.png';
import renderLinkSlices from '../utils/renderLinkSlices';
import { A, constants, Button, Img, MediaQueries } from '../style';
import styleConstants from '../style/constants';
import logo from '../images/mh_large.png';

const NavLink = styled.div`
  color: ${({ active }) =>
    active ? styleConstants.orange : styleConstants.black};
  font-size: 16px;
  margin: 20px;
  position: relative;
  &::after {
    width: 100%;
    height: ${props => (props.active ? '2px' : '0')};
    background-color: ${styleConstants.orange};
    position: absolute;
    content: '';
    left: 0;
    top: 25px;
  }

  &:hover {
    color: ${constants.orange};
  }
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
  z-index: 9998;
`;

const Logo = Img.extend`
  height: 60px;
  width: 60px;
  margin-right: 15px;

  ${MediaQueries.small} {
    width: 43px;
    height: 43px;
    margin-right: 8px;
  }
`;

const LogoMark = styled.div`
  display: flex;
  align-items: center;

  font-family: 'proxima-soft';
  font-weight: 700;
  text-transform: uppercase;
  font-size: 36px;

  ${MediaQueries.medium} {
    font-size: 30px;
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
  padding-top: 5px;
`;

const CtaButton = Button.extend`
  margin-top: 10px;
  font-size: 16px;
`;

class NavBar extends Component {
  static pageType = 'header';

  constructor(props) {
    super(props);
    this.state = {
      scrolledToTop: true,
      showMobileNav: false,
    };
    document.addEventListener('scroll', this.onScroll);
  }

  onScroll = () => {
    if (window.scrollY) {
      this.setState({ scrolledToTop: false });
    } else {
      this.setState({ scrolledToTop: true });
    }
  };

  componentWillUnmount() {
    document.removeEventListener('scroll', this.onScroll);
  }

  renderNavLinks = links =>
    links.map(link => {
      if (link.props.children.props.to === '/trips') {
        const { toTrips } = this.props;
        return (
          <CtaButton key="cta" onClick={toTrips}>
            {link.props.children.props.children}
          </CtaButton>
        );
      } else {
        return link;
      }
    });

  render() {
    const { loggedIn, currentPath, doc } = this.props;
    const { showMobileNav } = this.state;
    return (
      <div>
        <MobileNav
          show={showMobileNav}
          links={doc.data.body}
          closeNav={() => this.setState({ showMobileNav: false })}
        />
        <Nav scrolledToTop={this.state.scrolledToTop}>
          <NavLeft>
            <NavLink>
              <Link to="/">
                <LogoMark>
                  <Logo src={logo} />
                  Mass Hike
                </LogoMark>
              </Link>
            </NavLink>
          </NavLeft>
          <NavRight>
            {this.renderNavLinks(
              renderLinkSlices(doc.data.body, NavLink, currentPath)
            )}
          </NavRight>
          <Hamburger
            onClick={() =>
              this.setState({ showMobileNav: !this.state.showMobileNav })
            }
          >
            <Img src={showMobileNav ? xIcon : hamburger} />
          </Hamburger>
        </Nav>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  loggedIn: state.auth.isAuthenticated,
  currentPath: state.routing.location.pathname,
});

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      toTrips: () => push('/trips'),
    },
    dispatch
  );

const connected = connect(mapStateToProps, mapDispatchToProps)(NavBar);
export default PrismicPage(connected);

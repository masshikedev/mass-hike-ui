import React, { Component } from 'react';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';
import { bindActionCreators } from 'redux';
import { P, constants } from '../style';
import styled from 'styled-components';

const NavBackground = styled.div`
  width: 100%;
  height: calc(100% - ${constants.navHeight});
  position: fixed;
  background: ${constants.lightgreenBg};
  background-blend-mode: multiply;
  z-index: 9997;
  top: ${props => (props.show ? constants.navHeight : '-100%')};
  transition: top 0.5s;
`;

const NavWrapper = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  width: 100%;
`;

const NavItem = styled.div`
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  text-align: center;
  justify-content: center;
`;

const NavText = P.extend`
  font-size: 30px;
  letter-spacing: 1.5px;
  color: ${constants.offwhite};
  position: relative;
  &::after {
    width: 60px;
    height: 6px;
    border-radius: 3px;
    background-color: ${props =>
      props.active ? constants.yellow : 'transparent'};
    content: '';
    position: absolute;
    bottom: -20px;
    right: calc(50% - 30px);
  }
`;

class MobileNav extends Component {
  onClickNavItem(destination) {
    const { closeNav, push } = this.props;
    push(destination);
    closeNav();
  }

  render() {
    const { show, currentPath } = this.props;
    return (
      <NavBackground show={show}>
        <NavWrapper>
          <NavItem onClick={() => this.onClickNavItem('/')}>
            <NavText bold color="white" active={currentPath === '/'}>
              Home
            </NavText>
          </NavItem>
          <NavItem onClick={() => this.onClickNavItem('/about')}>
            <NavText bold color="white" active={currentPath === '/about'}>
              About
            </NavText>
          </NavItem>
          <NavItem onClick={() => this.onClickNavItem('/impact')}>
            <NavText bold color="white" active={currentPath === '/impact'}>
              Impact
            </NavText>
          </NavItem>
          <NavItem onClick={() => this.onClickNavItem('/faq')}>
            <NavText bold color="white" active={currentPath === '/faq'}>
              FAQs
            </NavText>
          </NavItem>
          <NavItem onClick={() => this.onClickNavItem('/blog')}>
            <NavText bold color="white" active={currentPath === '/blog'}>
              Blog
            </NavText>
          </NavItem>
          <NavItem onClick={() => this.onClickNavItem('/trips')}>
            <NavText bold color="white" active={currentPath === '/trips'}>
              Trips
            </NavText>
          </NavItem>
          <NavItem onClick={() => this.onClickNavItem('/donate')}>
            <NavText bold color="white" active={currentPath === '/donate'}>
              Donate
            </NavText>
          </NavItem>
        </NavWrapper>
      </NavBackground>
    );
  }
}

const mapStateToProps = state => ({
  currentPath: state.routing.location.pathname,
});

const mapDispatchToProps = dispatch => bindActionCreators({ push }, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(MobileNav);

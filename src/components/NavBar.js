import React, { Component } from 'react';
import { connect } from 'react-redux';
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
  border-bottom: solid;
  background: white;
`;

const NavItem = styled.div`
  display: block;
  padding: 10px;
`;

const NavLeft = styled.div`
  display: flex;
  flex: 4;
`;

const NavRight = styled.div`
  display: flex;
  flex-direction: row;
  flex: 6;
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
    const { loggedIn } = this.props;
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

export default connect(mapStateToProps)(NavBar);

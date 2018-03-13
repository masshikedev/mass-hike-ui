import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import {
  nextCheckoutSection,
  prevCheckoutSection,
} from '../../actions/CheckoutActions';
import styled from 'styled-components';
import { H3, Container, GridParent, MediaQueries } from '../../style';

const Wrapper = styled.div`
  position: fixed;
  display: grid;
  grid-template-columns: repeat(6, 1fr);
  grid-column-gap: 5px;
  background-color: white;

  height: 50px;
  bottom: 0px;
  width: 100%;
  border-top: 3px solid black;
`;

const NavItem = styled.div`
  align-content: center;
  text-align: center;
  line-height: 50px;
`;

const ButtonItem = styled(NavItem)`
  color: white;
  background-color: ${props => (props.enable ? 'black' : 'gray')};
  cursor: ${props => (props.enable ? 'pointer' : 'not-allowed')};
  line-height: 40px;
  margin: 5px;
`;

const Title = styled(NavItem)`
  grid-column: span 3;
`;

const UpButton = styled(ButtonItem)`
  grid-column: 4;
`;

const DownButton = styled(ButtonItem)`
  grid-column: 5;
`;

class BottomNav extends Component {
  canGoNext() {
    const { highestCompletedSection, currentSection } = this.props;
    return highestCompletedSection > currentSection;
  }

  canGoPrev() {
    const { currentSection } = this.props;
    return currentSection > 0;
  }

  scrollNext() {
    const { currentSection } = this.props;
    const newSection = document.getElementById(`section ${currentSection + 1}`);
    newSection.scrollIntoView(true);
  }

  scrollPrev() {
    const { currentSection } = this.props;
    const newSection = document.getElementById(`section ${currentSection - 1}`);
    newSection.scrollIntoView(true);
  }

  render() {
    const {
      currentSection,
      names,
      nextCheckoutSection,
      prevCheckoutSection,
    } = this.props;
    return (
      <Wrapper>
        <Title>{names[currentSection]}</Title>
        <UpButton
          enable={this.canGoPrev()}
          onClick={this.canGoPrev() ? prevCheckoutSection : null}
        >
          ^
        </UpButton>
        <DownButton
          enable={this.canGoNext()}
          onClick={this.canGoNext() ? nextCheckoutSection : null}
        >
          v
        </DownButton>
      </Wrapper>
    );
  }
}

const mapStateToProps = state => ({
  currentSection: state.checkout.currentSection,
  highestCompletedSection: state.checkout.highestCompletedSection,
});

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      nextCheckoutSection,
      prevCheckoutSection,
    },
    dispatch
  );

export default connect(mapStateToProps, mapDispatchToProps)(BottomNav);

import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import {
  nextCheckoutSection,
  prevCheckoutSection,
} from '../../actions/CheckoutActions';
import styled from 'styled-components';
import { P, constants } from '../../style';

const Wrapper = styled.div`
  position: fixed;
  display: flex;
  background: ${constants.lightgreenBg};
  background-blend-mode: multiply;
  align-items: center;
  justify-content: space-between;

  padding: 0px 8%;
  height: 50px;
  bottom: 0px;
  width: 84%;
`;

const NavItem = styled.div`
  align-content: center;
  text-align: center;
  line-height: 50px;
`;

const ButtonWrapper = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
`;

const ButtonItem = styled(NavItem)`
  color: white;
  background-color: ${constants.yellow};
  cursor: ${props => (props.enable ? 'pointer' : 'not-allowed')};
  opacity: ${props => (props.enable ? 1 : 0.5)};
  line-height: 40px;
  border-radius: 10px;
  margin: 5px;
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
`;

const Title = styled(NavItem)`
  grid-column: span 3;
  color: white;
  margin-bottom: -10px;
`;

const UpImg = styled.img`
  width: 60%;
  height: auto;
  display: block;
  margin: auto;
`;

const DownImg = styled.img`
  width: 60%;
  height: : auto;
  display: block;
  margin: auto;
  transform: rotate(180deg);
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
        <Title>
          <P medium proxima size="large" color="white">
            {names[currentSection]}
          </P>
        </Title>
        <ButtonWrapper>
          <ButtonItem
            enable={this.canGoPrev()}
            onClick={this.canGoPrev() ? prevCheckoutSection : null}
          >
            <UpImg src={require('../../images/white-arrow.png')} alt="Up" />
          </ButtonItem>
          <ButtonItem
            enable={this.canGoNext()}
            onClick={this.canGoNext() ? nextCheckoutSection : null}
          >
            <DownImg src={require('../../images/white-arrow.png')} alt="Down" />
          </ButtonItem>
        </ButtonWrapper>
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

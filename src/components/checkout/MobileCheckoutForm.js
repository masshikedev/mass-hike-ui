import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import {
  nextCheckoutSection,
  setCheckoutState,
} from '../../actions/CheckoutActions';
import styled from 'styled-components';
import { MediaQueries } from '../../style';
import CheckoutFormValidator from '../../utils/CheckoutFormValidator';

const Wrapper = styled.div`
  grid-column: span 12;
`;

const BottomSpacer = styled.div`
  height: 50px;
`;

const SectionWrapper = styled.div`
  height: 75vh;
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 5px 0px;
`;

class MobileCheckoutForm extends Component {
  isSectionComplete(fields) {
    for (const key in fields) {
      if (!CheckoutFormValidator[key](fields[key])) {
        return false;
      }
    }
    return true;
  }

  completeSection(fields) {
    const {
      nextCheckoutSection,
      setCheckoutState,
      currentSection,
    } = this.props;
    setCheckoutState(fields);
    nextCheckoutSection();
  }

  componentDidUpdate() {
    const { currentSection } = this.props;
    const newSection = document.getElementById(`section ${currentSection}`);
    newSection.scrollIntoView({
      block: 'center',
      inline: 'center',
      behavior: 'smooth',
    });
  }

  renderSections() {
    const { highestCompletedSection, components } = this.props;
    let sections = [];
    for (let i = 0; i < highestCompletedSection + 1; i++) {
      const FormSection = components[i];
      sections.push(
        <SectionWrapper key={i} id={`section ${i}`}>
          <FormSection
            showNextButton={() =>
              this.isSectionComplete() && i === highestCompletedSection
            }
            onClickNextButton={(fields, e) => {
              this.completeSection(fields);
              e.preventDefault();
            }}
          />
        </SectionWrapper>
      );
    }
    return sections;
  }

  render() {
    const { currentSection, components } = this.props;
    const FormSection = components[currentSection];
    return (
      <Wrapper>
        <form>{this.renderSections()}</form>
        <BottomSpacer />
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
      setCheckoutState,
    },
    dispatch
  );

export default connect(mapStateToProps, mapDispatchToProps)(MobileCheckoutForm);

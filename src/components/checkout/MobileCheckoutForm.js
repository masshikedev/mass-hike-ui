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
  componentWillMount() {
    const { currentSection } = this.props;

    // Setup isScrolling variable
    let isScrolling;

    const scrollListener = event => {
      // Clear our timeout throughout the scroll
      window.clearTimeout(isScrolling);

      // Set a timeout to run after scrolling ends
      isScrolling = setTimeout(() => this.handleScroll(), 66);
    };

    // Listen for scroll events
    this.setState({ scrollListener });
    window.addEventListener('scroll', scrollListener);
  }

  componentWillUnmount() {
    window.removeEventListener('scroll', this.state.scrollListener);
  }

  componentDidMount() {
    this.scrollToCurrentSection();
  }

  handleScroll() {
    const {
      currentSection,
      highestCompletedSection,
      setCurrentSection,
      components,
    } = this.props;
    const scroll = window.scrollY;
    const scrollBottom = scroll + window.innerHeight;
    const scrollCenter = (scroll + scrollBottom) / 2;
    const bottom = document.documentElement.scrollHeight;

    let y = 0;
    for (
      let i = 0;
      i <= highestCompletedSection && i < components.length;
      i++
    ) {
      let newY = y + document.getElementById(`section ${i}`).clientHeight;
      if (y < scrollCenter && scrollCenter < newY) {
        setCurrentSection(i);
      }
      y = newY;
    }
  }

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
    this.scrollToCurrentSection();
  }

  scrollToCurrentSection() {
    const { currentSection } = this.props;
    const newSection = document.getElementById(`section ${currentSection}`);
    if (newSection)
      newSection.scrollIntoView({
        block: 'center',
        inline: 'center',
        behavior: 'smooth',
      });
  }

  renderSections() {
    const { highestCompletedSection, components } = this.props;
    let sections = [];
    for (
      let i = 0;
      i < highestCompletedSection + 1 && i < components.length;
      i++
    ) {
      const FormSection = components[i];
      sections.push(
        <SectionWrapper key={i} id={`section ${i}`}>
          <FormSection
            showNextButton={fields =>
              this.isSectionComplete(fields) && i === highestCompletedSection
            }
            onClickNextButton={(fields, e) => {
              e.preventDefault();
              console.log(fields);
              this.completeSection(fields);
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
      setCurrentSection: section =>
        setCheckoutState({ currentSection: section }),
    },
    dispatch
  );

export default connect(mapStateToProps, mapDispatchToProps)(MobileCheckoutForm);

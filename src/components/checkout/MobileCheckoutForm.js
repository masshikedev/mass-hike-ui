import React, { Component } from 'react';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';
import { bindActionCreators } from 'redux';
import {
  nextCheckoutSection,
  setCheckoutState,
} from '../../actions/CheckoutActions';
import BaseSectionOrder from '../../data/CheckoutSectionOrder';
import BottomNav from './BottomNav';
import styled from 'styled-components';
import { Container, GridParent } from '../../style';

const SectionOrder = BaseSectionOrder.slice(0, 4);

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
    const { highestCompletedSection, setCurrentSection } = this.props;
    const scroll = window.scrollY;
    const scrollBottom = scroll + window.innerHeight;
    const scrollCenter = (scroll + scrollBottom) / 2;

    let y = 0;
    for (
      let i = 0;
      i <= highestCompletedSection && i < SectionOrder.length;
      i++
    ) {
      let newY = y + document.getElementById(`section ${i}`).clientHeight;
      if (y < scrollCenter && scrollCenter < newY) {
        setCurrentSection(i);
      }
      y = newY;
    }
  }

  completeSection = (fields, options) => {
    const {
      nextCheckoutSection,
      setCheckoutState,
      match,
      toConfirmation,
    } = this.props;
    setCheckoutState(fields);
    if (options.index === SectionOrder.length - 1) {
      toConfirmation(match.url);
    } else {
      nextCheckoutSection();
    }
  };

  componentDidUpdate() {
    this.scrollToCurrentSection();
  }

  scrollToCurrentSection() {
    const { currentSection } = this.props;
    console.log(currentSection);
    const newSection = document.getElementById(`section ${currentSection}`);
    if (newSection)
      newSection.scrollIntoView({
        block: 'center',
        inline: 'center',
        behavior: 'smooth',
      });
  }

  renderSections() {
    const { highestCompletedSection } = this.props;
    let sections = [];
    for (
      let i = 0;
      i < highestCompletedSection + 1 && i < SectionOrder.length;
      i++
    ) {
      const FormSection = SectionOrder[i].component;
      sections.push(
        <SectionWrapper key={i} id={`section ${i}`}>
          <FormSection
            index={i}
            completeSection={this.completeSection}
            mobile
          />
        </SectionWrapper>
      );
    }
    return sections;
  }

  render() {
    return (
      <div>
        <Container>
          <GridParent>
            <Wrapper>
              <form>{this.renderSections()}</form>
              <BottomSpacer />
            </Wrapper>
          </GridParent>
        </Container>
        <BottomNav names={SectionOrder.map(s => s.name)} />
      </div>
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
      toConfirmation: basePath => push(`${basePath}/confirmation`),
    },
    dispatch
  );

export default connect(mapStateToProps, mapDispatchToProps)(MobileCheckoutForm);

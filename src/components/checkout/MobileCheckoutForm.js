import React, { Component } from 'react';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';
import { bindActionCreators } from 'redux';
import {
  nextCheckoutSection,
  prevCheckoutSection,
  setCheckoutState,
} from '../../actions/CheckoutActions';
import SectionOrder from '../../data/CheckoutSectionOrder';
import BottomNav from './BottomNav';
import styled from 'styled-components';
import { Container, GridParent } from '../../style';
import CardPayment from './payments/CardPayment';
import { injectStripe } from 'react-stripe-elements';

const Wrapper = styled.div`
  position: absolute;
  top: 76px;
  grid-column: span 12;
  max-width: 800px;
  margin: 5% 12%;
  min-width: 200px;
`;

const BottomSpacer = styled.div`
  height: 50px;
`;

const SectionWrapper = styled.div`
  min-height: ${({ hidden }) => (hidden ? '' : '75vh')};
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
      const targetSection = document.getElementById(`section ${i}`);
      if (!targetSection) return;
      let newY = y + targetSection.clientHeight;
      if (y < scrollCenter && scrollCenter < newY) {
        setCurrentSection(i);
      }
      y = newY;
    }
  }

  completeSection = (fields, options) => {
    const {
      nextCheckoutSection,
      prevCheckoutSection,
      setCurrentSection,
      setCheckoutState,
      match,
      toConfirmation,
    } = this.props;
    setCheckoutState(fields);
    setCurrentSection(options.index);
    if (options.index === SectionOrder.length - 1) {
      toConfirmation(match.url);
    } else {
      if (options.goBack) {
        prevCheckoutSection();
      } else {
        nextCheckoutSection();
      }
    }
  };

  componentDidUpdate() {
    this.scrollToCurrentSection();
  }

  stripeCreateToken = callback =>
    this.props.stripe.createToken().then(({ token }) => {
      callback(token);
    });

  scrollToCurrentSection() {
    const { currentSection } = this.props;
    const newSection = document.getElementById(`section ${currentSection}`);
    if (newSection) {
      window.scroll({
        top: newSection.offsetTop,
        left: 0,
        behavior: 'smooth',
      });
      // newSection.scrollIntoView({
      //   block: 'start',
      //   inline: 'center',
      //   behavior: 'smooth',
      // });
    }
  }

  renderSections() {
    const { highestCompletedSection, paymentType } = this.props;
    const Contact = SectionOrder[0].component;
    const HikeInf = SectionOrder[1].component;
    const PayType = SectionOrder[2].component;
    const Payment = SectionOrder[3].component;
    const Confirm = SectionOrder[4].component;
    const showCard = highestCompletedSection >= 3 && paymentType === 'card';

    return (
      <React.Fragment>
        <SectionWrapper key={0} id={`section 0`}>
          <Contact index={0} completeSection={this.completeSection} mobile />
        </SectionWrapper>
        {highestCompletedSection >= 1 && (
          <SectionWrapper key={1} id={`section 1`}>
            <HikeInf index={1} completeSection={this.completeSection} mobile />
          </SectionWrapper>
        )}
        {highestCompletedSection >= 2 && (
          <SectionWrapper key={2} id={`section 2`}>
            <PayType index={2} completeSection={this.completeSection} mobile />
          </SectionWrapper>
        )}
        {highestCompletedSection >= 3 && !showCard ? (
          <SectionWrapper key={3} id={`section 3`}>
            <Payment index={3} completeSection={this.completeSection} mobile />
          </SectionWrapper>
        ) : (
          <SectionWrapper
            key={3}
            id={`section 3`}
            hidden={highestCompletedSection < 3}
          >
            <CardPayment
              index={3}
              completeSection={this.completeSection}
              show={showCard}
              mobile
            />
          </SectionWrapper>
        )}
        {highestCompletedSection >= 4 && (
          <SectionWrapper key={4} id={`section 4`}>
            <Confirm
              index={4}
              stripeCreateToken={this.stripeCreateToken}
              mobile
            />
          </SectionWrapper>
        )}
      </React.Fragment>
    );
  }

  render() {
    return (
      <div>
        <Container>
          <GridParent>
            <Wrapper>
              <form id="mobile-form-wrapper">{this.renderSections()}</form>
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
  paymentType: state.checkout.paymentType,
});

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      nextCheckoutSection,
      prevCheckoutSection,
      setCheckoutState,
      setCurrentSection: section =>
        setCheckoutState({ currentSection: section }),
      toConfirmation: basePath => push(`${basePath}/confirmation`),
    },
    dispatch
  );

export default injectStripe(
  connect(mapStateToProps, mapDispatchToProps)(MobileCheckoutForm)
);

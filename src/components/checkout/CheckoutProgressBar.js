import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { setCheckoutState } from '../../actions/CheckoutActions';
import styled from 'styled-components';
import P from '../../style/P';

const Wrapper = styled.div`
  position: absolute;
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  grid-template-rows: repeat(2, 1fr);
  height: 50px;
  bottom: 10px;
  width: 80%;

  @media (max-width: 767px) {
    display: none;
    grid-column: 0;
  }
`;

const sectionSequence = [
  'Contact Info',
  'Hike Info',
  'Payment Type',
  'Payment',
  'Order Summary',
];

class CheckoutProgressBar extends Component {
  renderProgressBarLinks() {
    const { highestCompletedSection, setCurrentSection } = this.props;
    const links = [];
    for (let i = 0; i < highestCompletedSection + 1; i++) {
      links.push(
        <div
          onClick={() => setCurrentSection(i)}
          style={{
            gridColumn: 'span 1',
            gridRow: '1',
            cursor: 'pointer',
          }}
          key={i}
        >
          <P>{sectionSequence[i]}</P>
        </div>
      );
    }
    return links;
  }
  renderProgressBarSections() {
    const { currentSection, highestCompletedSection } = this.props;
    const sections = [];
    for (let i = 0; i < highestCompletedSection + 1; i++) {
      const color = i === currentSection ? '#999' : '#000';
      sections.push(
        <div
          style={{
            backgroundColor: color,
            border: '3px solid white',
            gridColumn: 'span 1',
            gridRow: '2',
          }}
          key={i}
        />
      );
    }
    return sections;
  }

  render() {
    return (
      <Wrapper>
        {this.renderProgressBarLinks()}
        {this.renderProgressBarSections()}
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
      setCurrentSection: section =>
        setCheckoutState({ currentSection: section }),
    },
    dispatch
  );

export default connect(mapStateToProps, mapDispatchToProps)(
  CheckoutProgressBar
);

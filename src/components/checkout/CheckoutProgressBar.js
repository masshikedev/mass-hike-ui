import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { setCheckoutState } from '../../actions/CheckoutActions';

const sectionSequence = [
  'Contact Info',
  'Hike Info',
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
          <p>{sectionSequence[i]}</p>
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
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(4, 1fr)',
          gridTemplateRows: 'repeat(2, 1fr)',
          height: 50,
        }}
      >
        {this.renderProgressBarLinks()}
        {this.renderProgressBarSections()}
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
      setCurrentSection: section =>
        setCheckoutState({ currentSection: section }),
    },
    dispatch
  );

export default connect(mapStateToProps, mapDispatchToProps)(
  CheckoutProgressBar
);

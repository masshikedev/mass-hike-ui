import React, { Component } from 'react';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';
import { bindActionCreators } from 'redux';
import styled from 'styled-components';
import { P, MediaQueries } from '../../style';

const Wrapper = styled.div`
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  grid-template-rows: repeat(2, 1fr);
  height: 50px;
  bottom: 10px;
  width: 80%;

  ${MediaQueries.small} {
    display: none;
    grid-column: 0;
  }
`;

const ProgressBarLink = styled.div`
  grid-column: span 1;
  grid-row: 1;
  cursor: pointer;
`;

const ProgressBarSection = styled.div`
  grid-column: span 1;
  grid-row: 2;
  border: 3px solid white;
  background-color: ${props => props.color};
`;

class CheckoutProgressBar extends Component {
  renderProgressBarLinks() {
    const {
      highestCompletedSection,
      setCurrentSection,
      sectionOrder,
      tripId,
    } = this.props;
    const links = [];
    for (let i = 0; i < highestCompletedSection + 1; i++) {
      const nextSectionPath = sectionOrder[i].path;
      links.push(
        <ProgressBarLink
          onClick={() =>
            setCurrentSection(`/trips/${tripId}/checkout/${nextSectionPath}`)
          }
          key={i}
        >
          <P>{sectionOrder[i].name}</P>
        </ProgressBarLink>
      );
    }
    return links;
  }
  renderProgressBarSections() {
    const { currentSection, highestCompletedSection } = this.props;
    const sections = [];
    for (let i = 0; i < highestCompletedSection + 1; i++) {
      const color = i === currentSection ? '#000' : '#999';
      sections.push(<ProgressBarSection color={color} key={i} />);
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
  tripId: state.currentTrip.trip.tripId,
});

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      setCurrentSection: sectionPath => push(sectionPath),
    },
    dispatch
  );

export default connect(mapStateToProps, mapDispatchToProps)(
  CheckoutProgressBar
);

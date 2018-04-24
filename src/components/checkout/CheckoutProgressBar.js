import React, { Component } from 'react';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';
import { bindActionCreators } from 'redux';
import styled from 'styled-components';
import { P, MediaQueries } from '../../style';

const Wrapper = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr minmax(15px, 5%) minmax(15px, 5%)) 1fr;
  grid-template-rows: auto 1em;
  justify-items: center;
  align-items: center;
  width: 100%;
  margin-bottom: 15px;

  ${MediaQueries.small} {
    display: none;
    grid-column: 0;
  }
`;

const ProgressBarImgWrap = styled.div`
  width: 100%;
  height: 100%;
  grid-column: span 1;
  grid-row: 1;
  cursor: ${({ clickable }) => (clickable ? 'pointer' : 'not-allowed')};
  display: flex;
  align-items: center;
  justify-content: center;
`;

const ProgressBarTitle = styled.div`
  width: 100%;
  grid-column: span 1;
  grid-row: 2;
  text-align: center;
  cursor: ${({ clickable }) => (clickable ? 'pointer' : 'not-allowed')};
`;

const SectionImage = styled.img`
  width: ${({ big }) => (big ? '85px' : '50px')};
  height: auto;
  filter: ${({ grayscale }) => (grayscale ? 'grayscale(100%)' : 'none')};
  margin: auto;
`;

const Dot = styled.span`
  height: 7px;
  width: 7px;
  grid-column: span 1;
  grid-row: 1;
  background-color: darkgreen;
  border-radius: 50%;
  display: inline-block;
`;

const Space = styled.span`
  grid-column: span 1;
  grid-row: 2;
`;

class CheckoutProgressBar extends Component {
  renderProgressBarLinks() {
    const {
      highestCompletedSection,
      setCurrentSection,
      sectionOrder,
      tripId,
      currentSection,
    } = this.props;

    const links = [];
    let key = 0;
    return sectionOrder.map((section, i) => {
      const isCurrentSection = currentSection == i;
      const isAvailable = highestCompletedSection >= i;
      return (
        <React.Fragment key={key++}>
          <ProgressBarImgWrap
            onClick={() => {
              if (isAvailable)
                setCurrentSection(`/trips/${tripId}/checkout/${section.path}`);
            }}
            key={key++}
            clickable={isAvailable}
          >
            <SectionImage
              src={`/images/${section.img}`}
              grayscale={!isAvailable}
              big={isCurrentSection}
            />
          </ProgressBarImgWrap>

          {i != sectionOrder.length - 1 && (
            <React.Fragment>
              <Dot key={key++} />
              <Dot key={key++} />
            </React.Fragment>
          )}
        </React.Fragment>
      );
    });
  }
  renderProgressBarSections() {
    const {
      currentSection,
      setCurrentSection,
      highestCompletedSection,
      sectionOrder,
      tripId,
    } = this.props;
    const sections = [];
    let key = 0;
    return sectionOrder.map((section, i) => {
      const isAvailable = highestCompletedSection >= i;
      const isCurrentSection = currentSection == i;
      return (
        <React.Fragment key={key++}>
          <ProgressBarTitle
            key={key++}
            clickable={isAvailable}
            onClick={() => {
              if (isAvailable)
                setCurrentSection(`/trips/${tripId}/checkout/${section.path}`);
            }}
          >
            {!isCurrentSection && (
              <P proxima size="small">
                {section.name}
              </P>
            )}
          </ProgressBarTitle>
          {i != sectionOrder.length - 1 && (
            <React.Fragment>
              <Space key={key++} />
              <Space key={key++} />
            </React.Fragment>
          )}
        </React.Fragment>
      );
    });
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

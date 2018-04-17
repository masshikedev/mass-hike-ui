import React, { Component } from 'react';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';
import { bindActionCreators } from 'redux';
import { GridParent, constants } from '../../../style';
import styled from 'styled-components';

const TabBarContainer = GridParent.extend`
  margin-top: 20px;
`;

const Tab = styled.div`
  grid-column: span 4;
  font-family: 'proxima-nova';
  font-size: 16px;
  text-align: center;
  font-weight: ${props => (props.active ? 600 : 400)};
  color: white;
  background-color: ${props => (props.active ? constants.green : '#666666')};
  padding: 5px;
  cursor: pointer;
`;

class TripTabBar extends Component {
  render() {
    const { currentSection, tripId, toSection } = this.props;
    return (
      <TabBarContainer>
        <Tab
          active={currentSection === 0}
          onClick={() => toSection('ticketing', tripId)}
        >
          Tickets & Pickup
        </Tab>
        <Tab
          active={currentSection === 1}
          onClick={() => toSection('details', tripId)}
        >
          Trip Details
        </Tab>
        <Tab
          active={currentSection === 2}
          onClick={() => toSection('edit', tripId)}
        >
          Edit Trip
        </Tab>
      </TabBarContainer>
    );
  }
}

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      toSection: (section, tripId) => push(`/admin/trips/${tripId}/${section}`),
    },
    dispatch
  );

export default connect(null, mapDispatchToProps)(TripTabBar);

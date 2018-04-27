import React, { Component } from 'react';
import { Table, Tr, Th, Td } from '../../style';

class AppointmentGrid extends Component {
  render() {
    return (
      <Table>
        <thead>
          <Tr>
            <Th>Name</Th>
            <Th>Time</Th>
            <Th>Location</Th>
            <Th />
          </Tr>
        </thead>
      </Table>
    );
  }
}

export default AppointmentGrid;

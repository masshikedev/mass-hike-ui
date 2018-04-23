import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Table, Th, Tr, Td } from '../../../style';

class MemberGrid extends Component {
  renderMember(member) {
    return (
      <Tr key={member._id}>
        <Td>{member.name}</Td>
        <Td>{member.email || member.phone}</Td>
        <Td>{member.Classification || 'Unclassified'}</Td>
        <Td alignRight>
          <Link to={`/admin/members/${member._id}`}>details</Link>
        </Td>
      </Tr>
    );
  }
  render() {
    const { members } = this.props;
    return (
      <Table>
        <thead>
          <Tr>
            <Th>Name</Th>
            <Th>Contact</Th>
            <Th>Classification</Th>
            <Th />
          </Tr>
        </thead>
        <tbody>{members.map(member => this.renderMember(member))}</tbody>
      </Table>
    );
  }
}

export default MemberGrid;

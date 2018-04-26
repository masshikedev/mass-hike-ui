import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { P, Table, Th, Tr, Td } from '../../../style';

class MemberGrid extends Component {
  renderMember(member) {
    return (
      <Tr key={member._id}>
        <Td>
          <Link to={`/admin/members/${member._id}`}>{member.name}</Link>
        </Td>
        <Td>{member.email || member.phone}</Td>
        <Td>{member.classification || 'Unclassified'}</Td>
        <Td>{member.orders.length}</Td>
      </Tr>
    );
  }

  memberFilter = (member, search) => {
    member.classification = member.classification || 'unclassified';
    return (
      (member.name && member.name.includes(search)) ||
      (member.email && member.email.includes(search)) ||
      (member.phone && member.phone.includes(search)) ||
      (member.classification && member.classification.includes(search))
    );
  };

  filteredMembers() {
    const { search, members } = this.props;
    if (!search) {
      return members;
    }
    return members.filter(member => this.memberFilter(member, search));
  }

  render() {
    const members = this.filteredMembers();
    if (members.length === 0) {
      return (
        <Table>
          <Tr>
            <Td>No results found</Td>
          </Tr>
        </Table>
      );
    }
    return (
      <Table>
        <thead>
          <Tr>
            <Th>Name</Th>
            <Th>Contact</Th>
            <Th>Classification</Th>
            <Th>Trips</Th>
          </Tr>
        </thead>
        <tbody>{members.map(member => this.renderMember(member))}</tbody>
      </Table>
    );
  }
}

export default MemberGrid;

import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Link } from 'react-router-dom';
import LoadableComponent from '../components/LoadableComponent';
import { adminGetMemberById } from '../actions/MemberActions';
import { AdminContainer, H2, H3, Table, Tr, Th, Td } from '../style';
import styled from 'styled-components';
import moment from 'moment';
import { MONTH_DATE_YEAR } from '../utils/dateFormats';

class MemberDetail extends LoadableComponent {
  componentWillMount() {
    const { getMemberById, match } = this.props;
    getMemberById(match.params.id);
  }

  renderOrder(order) {
    return (
      <Tr key={order._id}>
        <Td>
          <Link to={`/admin/trips/${order.tripId}/ticketing`}>
            {order.trip.name}
          </Link>
        </Td>
        <Td>{moment.utc(order.trip.time.hikeStart).format(MONTH_DATE_YEAR)}</Td>
        <Td>{order.tickets}</Td>
        <Td>{order.trip.children}</Td>
      </Tr>
    );
  }

  renderSuccess = () => {
    const { member } = this.props;
    return (
      <AdminContainer>
        <H2>{`Member: ${member.name}`}</H2>
        <H3>Personal Information</H3>
        <Table fixed>
          <Tr>
            <Th>Name</Th>
            <Th>Email</Th>
            <Th>Phone</Th>
          </Tr>
          <tbody>
            <Tr>
              <Td>{member.name}</Td>
              <Td>{member.email}</Td>
              <Td>{member.phone}</Td>
            </Tr>
          </tbody>
        </Table>
        <Table fixed>
          <Tr>
            <Th>Classification</Th>
            <Th>Join Date</Th>
            <Th />
          </Tr>
          <tbody>
            <Tr>
              <Td>{member.classification || 'unclassified'}</Td>
              <Td>{moment.utc(member.createdAt).format(MONTH_DATE_YEAR)}</Td>
            </Tr>
          </tbody>
        </Table>
        <H3>Trips</H3>
        <Table>
          <Tr>
            <Th>Name</Th>
            <Th>Date</Th>
            <Th>Tickets</Th>
            <Th>Children</Th>
          </Tr>
          <tbody>{member.orders.map(order => this.renderOrder(order))}</tbody>
        </Table>
      </AdminContainer>
    );
  };
}

const mapStateToProps = state => ({
  member: state.members.currentMember,
  status: state.members.currentMemberStatus,
});

const mapDispatchToProps = dispatch =>
  bindActionCreators({ getMemberById: adminGetMemberById }, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(MemberDetail);

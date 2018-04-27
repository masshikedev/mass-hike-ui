import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Link } from 'react-router-dom';
import LoadableComponent from '../components/LoadableComponent';
import AdminPage from '../components/admin/AdminPage';
import { adminGetMemberById } from '../actions/MemberActions';
import { AdminContainer, P, H2, H5, Table, Tr, Th, Td } from '../style';
import styled from 'styled-components';
import moment from 'moment';
import { MONTH_DATE_YEAR } from '../utils/dateFormats';

const EditSection = styled.span`
  font-size: 18px;
  margin-left: 20px;
  font-weight: 400;
  text-decoration: underline;
`;

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
        <Td>{order.trip.children || 0}</Td>
      </Tr>
    );
  }

  renderOrders() {
    const { member } = this.props;
    if (member.orders.length === 0) {
      return <P>This member has not been on any trips yet</P>;
    }
    return (
      <Table>
        <thead>
          <Tr>
            <Th>Name</Th>
            <Th>Date</Th>
            <Th>Tickets</Th>
            <Th>Children</Th>
          </Tr>
        </thead>
        <tbody>{member.orders.map(order => this.renderOrder(order))}</tbody>
      </Table>
    );
  }

  renderSuccess = () => {
    const { member } = this.props;
    return (
      <AdminContainer>
        <H2>
          {`Member: ${member.name}`}
          <EditSection>
            <Link to={`/admin/members/${member._id}/edit`}>Edit</Link>
          </EditSection>
        </H2>
        <H5>Personal Information</H5>
        <Table fixed>
          <thead>
            <Tr>
              <Th>Name</Th>
              <Th>Email</Th>
              <Th>Phone</Th>
            </Tr>
          </thead>
          <tbody>
            <Tr>
              <Td>{member.name}</Td>
              <Td>{member.email}</Td>
              <Td>{member.phone}</Td>
            </Tr>
          </tbody>
        </Table>
        <Table fixed>
          <thead>
            <Tr>
              <Th>Classification</Th>
              <Th>Join Date</Th>
              <Th />
            </Tr>
          </thead>
          <tbody>
            <Tr>
              <Td>{member.classification || 'unclassified'}</Td>
              <Td>{moment.utc(member.createdAt).format(MONTH_DATE_YEAR)}</Td>
            </Tr>
          </tbody>
        </Table>
        <H5>Trips</H5>
        {this.renderOrders()}
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

export default AdminPage(
  connect(mapStateToProps, mapDispatchToProps)(MemberDetail)
);

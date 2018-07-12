import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Link } from 'react-router-dom';
import LoadableComponent from '../components/LoadableComponent';
import PickupMap from '../components/admin/tripDetail/PickupMap';
import CancellationForm from '../components/admin/CancellationForm';
import { getOrderById, adminEditOrder } from '../actions/OrderActions';
import moment from 'moment';
import { MONTH_DATE_YEAR, TIME } from '../utils/dateFormats';
import { RequestStatus } from '../constants';
import {
  AdminContainer,
  P,
  H2,
  H5,
  H6,
  Table,
  Th,
  Tr,
  Td,
  Button,
} from '../style';
import styled from 'styled-components';

const Subtitle = P.extend`
  margin-top: 5px;
  margin-bottom: 30px;
`;

const AppointmentTable = Table.extend`
  margin-bottom: 10px;
`;

const AppointmentButton = Button.extend`
  margin-bottom: 40px;
`;

const Back = styled.span`
  font-size: 18px;
  font-family: 'proxima-nova';
  font-weight: 400;
  text-decoration: underline;
`;

class OrderDetail extends LoadableComponent {
  componentWillMount() {
    const { getOrderById, match } = this.props;
    getOrderById(match.params.id);
  }

  onClickMarkPaid = e => {
    const { order, adminEditOrder } = this.props;
    e.preventDefault();
    adminEditOrder(order._id, { paid: true });
  };

  onCancel = () => {
    const { order, adminEditOrder } = this.props;
    adminEditOrder(order._id, { cancelled: true });
  };

  renderSubtitle() {
    const { order } = this.props;
    if (order.cancelled) {
      return (
        <Subtitle proxima bold color="error" size="large">
          Cancelled
        </Subtitle>
      );
    } else if (order.trip.cancelled) {
      return (
        <Subtitle proxima bold color="error" size="large">
          Trip Cancelled
        </Subtitle>
      );
    } else if (order.paid) {
      return (
        <Subtitle proxima bold color="green" size="large">
          Paid
        </Subtitle>
      );
    }
    return (
      <Subtitle proxima bold color="yellow" size="large">
        Unpaid
      </Subtitle>
    );
  }

  renderAppointmentDetails() {
    const { order, editStatus } = this.props;
    return (
      <div>
        <H5>Appointment Details</H5>
        <AppointmentTable fixed>
          <thead>
            <Tr>
              <Th>Location</Th>
              <Th>Address</Th>
              <Th>Date</Th>
              <Th>Time</Th>
            </Tr>
          </thead>
          <tbody>
            <Tr>
              <Td>{order.meetingLocation.name}</Td>
              <Td>{order.meetingLocation.address}</Td>
              <Td>{moment(order.meetingDate).format(MONTH_DATE_YEAR)}</Td>
              <Td>{moment(order.meetingDate).format(TIME)}</Td>
            </Tr>
          </tbody>
        </AppointmentTable>
        {editStatus !== RequestStatus.PENDING && (
          <AppointmentButton onClick={this.onClickMarkPaid}>
            Mark as paid
          </AppointmentButton>
        )}
      </div>
    );
  }

  renderSuccess = () => {
    const { order, editStatus } = this.props;
    return (
      <AdminContainer>
        <Back>
          <Link to={`/admin/trips/${order.tripId}/ticketing`}>
            Back to trip
          </Link>
        </Back>
        <H2>
          {`Order: ${order.name}`}
          {this.renderSubtitle()}
        </H2>
        <H5>Trip</H5>
        <Table fixed>
          <thead>
            <Tr>
              <Th>Name</Th>
              <Th>Date</Th>
              <Th>Location</Th>
              <Th />
            </Tr>
          </thead>
          <tbody>
            <Tr>
              <Td>
                <Link to={`/admin/trips/${order.trip.tripId}/ticketing`}>
                  {order.trip.name}
                </Link>
              </Td>
              <Td>
                {moment(order.trip.time.hikeStart).format(MONTH_DATE_YEAR)}
              </Td>
              <Td>{order.trip.location}</Td>
            </Tr>
          </tbody>
        </Table>
        <H5>Payment Details</H5>
        <Table fixed>
          <thead>
            <Tr>
              <Th>Tickets</Th>
              <Th>Selected Price</Th>
              <Th>Revenue</Th>
              <Th>Paid?</Th>
            </Tr>
          </thead>
          <tbody>
            <Tr>
              <Td>{order.tickets}</Td>
              <Td>{`$${order.selectedPrice}`}</Td>
              <Td>{`$${order.tickets * order.selectedPrice}`}</Td>
              <Td>{order.paid ? order.paymentType : 'unpaid'}</Td>
            </Tr>
          </tbody>
        </Table>
        {!order.paid && this.renderAppointmentDetails()}
        <H5>Contact Info</H5>
        <Table>
          <thead>
            <Tr>
              <Th>Email</Th>
              <Th>Phone</Th>
              <Th>Preffered Contact</Th>
              <Th>Member?</Th>
            </Tr>
          </thead>
          <tbody>
            <Tr>
              <Td>{order.email}</Td>
              <Td>{order.phone}</Td>
              <Td>
                {order.preferredContactMethods.length > 1
                  ? 'either'
                  : order.preferredContactMethods[0]}
              </Td>
              <Td>
                {order.memberId ? (
                  <Link to={`/admin/members/${order.memberId}`}>details</Link>
                ) : (
                  'no'
                )}
              </Td>
            </Tr>
          </tbody>
        </Table>
        <H5>Pickup</H5>
        <H6>Pickup Address</H6>
        <P>{order.pickupLocation}</P>
        <PickupMap orders={[order]} />
        {!order.cancelled &&
          !order.trip.cancelled &&
          editStatus !== RequestStatus.PENDING && (
            <CancellationForm type="order" onCancel={this.onCancel} />
          )}
      </AdminContainer>
    );
  };
}

const mapStateToProps = state => ({
  order: state.orders.currentOrder,
  status: state.orders.currentOrderStatus,
  editStatus: state.orders.updateOrderStatus,
});

const mapDispatchToProps = dispatch =>
  bindActionCreators({ getOrderById, adminEditOrder }, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(OrderDetail);

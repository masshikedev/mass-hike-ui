import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { setCheckoutState } from '../actions/CheckoutActions';
import { format } from 'date-fns';
import { MONTH_DATE_YEAR, TIME } from '../utils/dateFormats';
import { P, H2, H6 } from '../style';
import styled from 'styled-components';

const Wrapper = styled.div`
  display: grid;
  grid-template-columns: repeat(2, auto);
  justify-content: stretch;
`;

const Column = styled.div`
  grid-column: span 1;
`;

const EditButton = styled.span`
  cursor: pointer;
  font-size: 14px;
  margin-left: 15px;
`;

const HeadingContainer = styled.div`
  display: flex;
`;

class OrderSummary extends Component {
  editButtonForSection(n) {
    const { showEditButtons, setCurrentSection } = this.props;
    return showEditButtons ? (
      <EditButton
        onClick={e => {
          e.preventDefault();
          setCurrentSection(n);
        }}
      >
        edit
      </EditButton>
    ) : null;
  }
  render() {
    const { order } = this.props;
    const trip = order.trip;
    return (
      <div>
        <H2>Order Summary</H2>
        <Wrapper>
          <Column>
            <P large>
              {trip.name}
              <br />
              {format(trip.time.hikeStart, MONTH_DATE_YEAR)}
              <br />
              {format(trip.time.hikeStart, TIME)}
              <br />
            </P>
            <HeadingContainer>
              <H6>Contact Info</H6>
              {this.editButtonForSection(0)}
            </HeadingContainer>
            <P large>
              {order.name}
              <br />
              {order.email}
              <br />
              {order.phone}
            </P>
            <HeadingContainer>
              <H6>Payment Type</H6>
              {this.editButtonForSection(2)}
            </HeadingContainer>
            <P>{order.paymentType}</P>
            {order.paymentType === 'card' && (
              <div>
                <H6>Credit Card</H6>
                <P large>
                  Card Type
                  <br />
                  {order.cardNumber}
                </P>
              </div>
            )}
            {order.paymentType === 'cash' && (
              <div>
                <P large>{order.meetingDate}</P>
                <P large>{order.meetingLocation.name}</P>
              </div>
            )}
          </Column>
          <Column>
            <H6>Pickup</H6>
            <P large>{order.pickupLocation}</P>
            <H6>Contact Method</H6>
            <P large capitalize>
              {order.preferredContactMethods.join(', ')}
            </P>
          </Column>
        </Wrapper>
        <P large>{`${order.tickets} Tickets`}</P>
        <P large>{`$${order.tickets * order.selectedPrice}`}</P>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  currentSection: state.checkout.currentSection,
});

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      setCurrentSection: section =>
        setCheckoutState({ currentSection: section }),
    },
    dispatch
  );

export default connect(mapStateToProps, mapDispatchToProps)(OrderSummary);

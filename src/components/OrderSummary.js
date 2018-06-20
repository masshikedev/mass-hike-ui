import React from 'react';
import EditButton from './checkout/EditButton';
import moment from 'moment';
import {
  MONTH_DATE_YEAR,
  DAY_MONTH_DATE_TIME,
  TIME,
} from '../utils/dateFormats';
import { P, H2, H6, MediaQueries, constants } from '../style';
import styled from 'styled-components';

const Wrapper = styled.div`
  display: grid;
  grid-auto-flow: column;
  grid-template-columns: repeat(2, auto);
  grid-template-rows: repeat(3, auto);
  ${MediaQueries.small} {
    grid-template-columns: auto;
    grid-template-rows: repeat(6, auto);
  }
  justify-content: stretch;
  grid-column-gap: 15px;
`;

const HeadingContainer = styled.div`
  display: flex;
`;

const Section = styled.div`
  grid-row: span 1;
  grid-column: span 1;
  margin-bottom: 15px;
`;

export default function OrderSummary(props) {
  const {
    order,
    showEditButtons,
    mobile,
    errors,
    cardNumberError,
    cardExpiryError,
    cardCvcError,
    postalCodeError,
  } = props;
  const trip = order.trip;
  return (
    <div>
      <Wrapper>
        <Section>
          <H6 color={constants.green}>Trip Summary</H6>
          <P proxima>
            {trip.name}
            <br />
            {moment(trip.time.hikeStart).format(MONTH_DATE_YEAR)}
            <br />
            {moment(trip.time.hikeStart).format(TIME)}
            {' - '}
            {moment(trip.time.hikeEnd).format(TIME)}
            <br />
          </P>
        </Section>
        <Section>
          <HeadingContainer>
            <H6 color={constants.green}>Contact Info</H6>
            <EditButton display={showEditButtons} section={0} mobile={mobile} />
          </HeadingContainer>
          <P proxima>
            {order.name}
            <br />
            {order.email}
            <br />
            {order.phone}
          </P>
          {errors &&
            errors['name'] && (
              <P color="error" proxima>
                {errors['name'][0]}
              </P>
            )}
          {errors &&
            errors['email'] && (
              <P color="error" proxima>
                {errors['email'][0]}
              </P>
            )}
          {errors &&
            errors['phone'] && (
              <P color="error" proxima>
                {errors['phone'][0]}
              </P>
            )}
        </Section>
        <Section>
          <HeadingContainer>
            <H6 color={constants.green}>Payment</H6>
            <EditButton display={showEditButtons} section={2} mobile={mobile} />
          </HeadingContainer>
          <P proxima>{order.paymentType === 'cash' ? 'Cash' : 'Credit Card'}</P>
          {errors &&
            errors['paymentType'] && (
              <P color="error" proxima>
                {errors['paymentType'][0]}
              </P>
            )}
        </Section>

        <Section>
          <HeadingContainer>
            <H6 color={constants.green}>Preferred Pickup</H6>
            <EditButton display={showEditButtons} section={1} mobile={mobile} />
          </HeadingContainer>
          <P proxima>{order.pickupLocation}</P>
          <P size="small" proxima>
            Your final pickup location will be sent to you before the date of
            your hike.
          </P>
        </Section>
        <Section>
          <HeadingContainer>
            <H6 color={constants.green}>Contact Method</H6>
            <EditButton display={showEditButtons} section={0} mobile={mobile} />
          </HeadingContainer>
          <P capitalize proxima>
            {order.preferredContactMethods.join(', ')}
          </P>
          {errors &&
            errors['preferredContactMethods'] && (
              <P color="error" proxima>
                {errors['preferredContactMethods'][0]}
              </P>
            )}
        </Section>

        <Section>
          {order.paymentType === 'card' && (
            <div>
              <H6 color={constants.green}>Card Details</H6>
              {cardNumberError && (
                <P color="error" proxima>
                  {cardNumberError.message}
                </P>
              )}
              {cardExpiryError && (
                <P color="error" proxima>
                  {cardExpiryError.message}
                </P>
              )}
              {cardCvcError && (
                <P color="error" proxima>
                  {cardCvcError.message}
                </P>
              )}
              {postalCodeError && (
                <P color="error" proxima>
                  {postalCodeError.message}
                </P>
              )}
              <P capitalize proxima>
                {order.cardBrand || `${order.cardType} ${order.cardNumber}`}
              </P>
            </div>
          )}
          {order.paymentType === 'cash' && (
            <div>
              <H6 color={constants.green}>Payment Location</H6>
              <P proxima>
                BCYF {order.meetingLocation.name} on{' '}
                {moment(order.meetingDate).format(DAY_MONTH_DATE_TIME)}
              </P>
            </div>
          )}
        </Section>
      </Wrapper>
      <P proxima>
        {`${order.tickets} Tickets x $${order.selectedPrice} each`}
        <br />
        {`Total: $${order.tickets * order.selectedPrice}`}
      </P>
      {errors &&
        errors['tickets'] && (
          <P color="error" proxima>
            {errors['tickets'][0]}
          </P>
        )}
      {errors &&
        errors['selectedPrice'] && (
          <P color="error" proxima>
            {errors['selectedPrice'][0]}
          </P>
        )}
    </div>
  );
}

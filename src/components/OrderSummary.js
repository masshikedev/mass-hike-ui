import React from 'react';
import EditButton from './checkout/EditButton';
import moment from 'moment';
import { MONTH_DATE_YEAR, TIME } from '../utils/dateFormats';
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
`;

const HeadingContainer = styled.div`
  display: flex;
`;

const Section = styled.div`
  grid-row: span 1;
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
          <P large proxima>
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
          <P large proxima>
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
          <P proxima>{order.paymentType}</P>
          {errors &&
            errors['paymentType'] && (
              <P color="error" proxima>
                {errors['paymentType'][0]}
              </P>
            )}
          {order.paymentType === 'card' && (
            <div>
              <H6 color={constants.green}>Credit Card</H6>
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
              <P large capitalize proxima>
                {order.cardBrand}
              </P>
            </div>
          )}
          {order.paymentType === 'cash' && (
            <div>
              <P large proxima>
                {order.meetingDate}
              </P>
              <P large proxima>
                {order.meetingLocation.name}
              </P>
            </div>
          )}
        </Section>

        <Section>
          <HeadingContainer>
            <H6 color={constants.green}>Pickup</H6>
            <EditButton display={showEditButtons} section={1} mobile={mobile} />
          </HeadingContainer>
          <P large proxima>
            {order.pickupLocation}
          </P>
        </Section>
        <Section>
          <HeadingContainer>
            <H6 color={constants.green}>Contact Method</H6>
            <EditButton display={showEditButtons} section={0} mobile={mobile} />
          </HeadingContainer>
          <P large capitalize proxima>
            {order.preferredContactMethods.join(', ')}
          </P>
          {errors &&
            errors['preferredContactMethods'] && (
              <P color="error" proxima>
                {errors['preferredContactMethods'][0]}
              </P>
            )}
        </Section>
      </Wrapper>
      <P large proxima>
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

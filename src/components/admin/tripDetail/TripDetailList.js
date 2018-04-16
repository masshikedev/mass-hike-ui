import React, { Component } from 'react';
import PromoCodeGrid from '../tripForm/PromoCodeGrid';
import ZipcodeList from '../tripForm/ZipcodeList';
import CashLocationList from '../tripForm/CashLocationList';
import AvailabilityForm from '../tripForm/AvailabilityForm';
import styled from 'styled-components';
import moment from 'moment';
import { TIME } from '../../../utils/dateFormats';
import {
  P,
  H3,
  H6,
  GridParent,
  Table,
  Tr,
  Th,
  Td,
  MediaQueries,
  Img,
} from '../../../style';

const TripDetailSection = styled.div`
  margin-bottom: 30px;
`;

const Subheading = H6.extend`
  margin-top: 25px;
  ${MediaQueries.small} {
    font-size: 18px;
  }
`;

const ContentColumn = styled.div`
  grid-column: span 8;
`;

const SECTION = 1;

class TripDetailList extends Component {
  componentWillMount() {
    const { setCurrentSection } = this.props;
    setCurrentSection(SECTION);
  }

  render() {
    const { trip } = this.props;
    return (
      <div>
        <TripDetailSection>
          <H3>Date and Time</H3>
          <Table fixed>
            <thead>
              <Tr>
                <Th>Pickup</Th>
                <Th>Hike</Th>
                <Th>Dropoff</Th>
                <Th />
              </Tr>
            </thead>
            <tbody>
              <Tr>
                <Td>
                  <P>{`${moment
                    .utc(trip.time.pickupStart)
                    .format(TIME)} - ${moment
                    .utc(trip.time.pickupEnd)
                    .format(TIME)}`}</P>
                </Td>
                <Td>
                  <P>{`${moment
                    .utc(trip.time.hikeStart)
                    .format(TIME)} - ${moment
                    .utc(trip.time.hikeEnd)
                    .format(TIME)}`}</P>
                </Td>
                <Td>
                  <P>{`${moment
                    .utc(trip.time.dropoffStart)
                    .format(TIME)} - ${moment
                    .utc(trip.time.dropoffEnd)
                    .format(TIME)}`}</P>
                </Td>
              </Tr>
            </tbody>
          </Table>
        </TripDetailSection>
        <TripDetailSection>
          <H3>Capcity</H3>
          <Subheading>Total Capacity</Subheading>
          <P>{trip.capacity}</P>
        </TripDetailSection>
        <TripDetailSection>
          <H3>Pricing</H3>
          <Table fixed>
            <thead>
              <Tr>
                <Th>Base</Th>
                <Th>Max</Th>
                <Th>Suggestions</Th>
                <Th />
              </Tr>
            </thead>
            <tbody>
              <Tr>
                <Td>{`$${trip.pricing.min}`}</Td>
                <Td>{`$${trip.pricing.max}`}</Td>
                <Td>{`$${trip.pricing.suggestion1}, $${
                  trip.pricing.suggestion2
                }, $${trip.pricing.suggestion3}`}</Td>
              </Tr>
            </tbody>
          </Table>
        </TripDetailSection>
        <TripDetailSection>
          <H3>Promo Codes</H3>
          <PromoCodeGrid codes={trip.promoCodes} fixed />
        </TripDetailSection>
        <TripDetailSection>
          <H3>Difficulty and Statistics</H3>
          <Subheading>Difficulty</Subheading>
          <P>{trip.difficulty}</P>
          <Table fixed>
            <thead>
              <Tr>
                <Th>Distance</Th>
                <Th>Elevation</Th>
                <Th />
                <Th />
              </Tr>
            </thead>
            <tbody>
              <Tr>
                <Td>{trip.stats.hikeDistance}</Td>
                <Td>{trip.stats.elevation}</Td>
              </Tr>
            </tbody>
          </Table>
        </TripDetailSection>
        <TripDetailSection>
          <H3>Content</H3>
          <GridParent>
            <ContentColumn>
              <Subheading>Title</Subheading>
              <P>{trip.detail.title}</P>
              <Subheading>Body</Subheading>
              <P>{trip.detail.body}</P>
              <Subheading>Image</Subheading>
              <Img src={trip.detail.imageUrl} />
            </ContentColumn>
          </GridParent>
        </TripDetailSection>
        <TripDetailSection>
          <H3>Pickup Radius</H3>
          <ZipcodeList zipcodes={trip.pickupZipcodes} />
        </TripDetailSection>
        <TripDetailSection>
          <H3>Cash Locations</H3>
          <CashLocationList locations={trip.cashLocations} />
        </TripDetailSection>
        <TripDetailSection>
          <H3>Availability</H3>
          <AvailabilityForm availability={trip.cashAvailability} />
        </TripDetailSection>
      </div>
    );
  }
}

export default TripDetailList;

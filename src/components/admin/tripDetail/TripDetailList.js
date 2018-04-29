import React, { Component } from 'react';
import { connect } from 'react-redux';
import { HashLink as Link } from 'react-router-hash-link';
import { push } from 'react-router-redux';
import { bindActionCreators } from 'redux';
import PromoCodeGrid from '../tripForm/PromoCodeGrid';
import ZipcodeList from '../tripForm/ZipcodeList';
import styled from 'styled-components';
import moment from 'moment';
import { TIME } from '../../../utils/dateFormats';
import {
  P,
  H5,
  H6,
  GridParent,
  Table,
  Tr,
  Th,
  Td,
  MediaQueries,
  Img,
  Button,
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

const linkStyle = {
  fontSize: 16,
  marginLeft: 20,
  textDecoration: 'underline',
};

const SECTION = 1;

class TripDetailList extends Component {
  componentWillMount() {
    const { setCurrentSection } = this.props;
    setCurrentSection(SECTION);
  }

  editLinkFor = sectionId => {
    const { trip } = this.props;
    if (trip.cancelled || trip.time.hikeStart < Date.now()) {
      return null;
    }
    return (
      <Link
        to={`/admin/trips/${trip.tripId}/edit#${sectionId}`}
        style={linkStyle}
      >
        Edit
      </Link>
    );
  };

  render() {
    const { trip } = this.props;
    return (
      <div>
        <TripDetailSection>
          <H5>
            Date and Time
            {this.editLinkFor('time')}
          </H5>
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
          <H5>
            Capacity
            {this.editLinkFor('capacity')}
          </H5>
          <Subheading>Total Capacity</Subheading>
          <P>{trip.capacity}</P>
        </TripDetailSection>
        <TripDetailSection>
          <H5>
            Base Pricing
            {this.editLinkFor('pricing')}
          </H5>
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
          <H5>
            Promo Codes
            {this.editLinkFor('promo-codes')}
          </H5>
          <PromoCodeGrid codes={trip.promoCodes} fixed />
        </TripDetailSection>
        <TripDetailSection>
          <H5>
            Difficulty and Statistics
            {this.editLinkFor('stats')}
          </H5>
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
          <H5>
            Content
            {this.editLinkFor('content')}
          </H5>
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
          <H5>
            Pickup Radius
            {this.editLinkFor('pickup-radius')}
          </H5>
          <ZipcodeList zipcodes={trip.pickupZipcodes} />
        </TripDetailSection>
        <TripDetailSection>
          <H5>
            Availability
            {this.editLinkFor('availability')}
          </H5>
        </TripDetailSection>
      </div>
    );
  }
}

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      toEdit: (tripId, sectionId) =>
        push(`/admin/trips/${tripId}/edit#${sectionId}`),
    },
    dispatch
  );

export default connect(null, mapDispatchToProps)(TripDetailList);

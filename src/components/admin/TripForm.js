import React, { Component } from 'react';
import ImageDropzone from '../ImageDropzone';
import TripTimeSelector from './TripTimeSelector';
import PricingForm from './PricingForm';
import PromoCodeGrid from './PromoCodeGrid';
import ZipcodeList from './ZipcodeList';
import CashLocationList from './CashLocationList';
import ZipcodeForm from './ZipcodeForm';
import emptyTrip from '../../data/emptyTrip';
import {
  H3,
  H4,
  H6,
  Input,
  TextArea,
  Button,
  GridParent,
  Img,
} from '../../style';
import styled from 'styled-components';

const TripFormSection = styled.div`
  margin-bottom: 30px;
`;

const Column = styled.div`
  grid-column: span 4;
`;

const TripInput = Input.extend`
  &[type='text'] {
    max-width: 400px;
  }
`;

const CalendarWrapper = styled.div`
  margin: 10px 0;
`;

const PreviewImage = Img.extend`
  width: 400px;
  height: auto;
`;

class TripForm extends Component {
  constructor(props) {
    super(props);
    const baseState = props.trip ? props.trip : emptyTrip;
    this.state = {
      ...baseState,
      uploadInProgress: false,
      currentZipcode: '',
    };
  }

  fieldFor = (fieldName, parent, InputComponent = TripInput) => {
    const base = parent ? this.state[parent] : this.state;
    const onChange = e => {
      const newState = parent
        ? { [parent]: { ...this.state[parent], [fieldName]: e.target.value } }
        : { [fieldName]: e.target.value };
      this.setState(newState);
    };
    return (
      <InputComponent type="text" value={base[fieldName]} onChange={onChange} />
    );
  };

  onAddPromoCode = options => {
    this.setState({ promoCodes: this.state.promoCodes.concat([options]) });
  };

  onDeletePromoCode = index => {
    const { promoCodes } = this.state;
    promoCodes.splice(index, 1);
    this.setState({ promoCodes });
  };

  onAddZipcode = zipcode => {
    this.setState({
      pickupZipcodes: this.state.pickupZipcodes.concat([zipcode]),
    });
  };

  onDeleteZipcode = index => {
    const { pickupZipcodes } = this.state;
    pickupZipcodes.splice(index, 1);
    this.setState({ pickupZipcodes });
  };

  onDeleteCashLocation = index => {
    const { cashLocations } = this.state;
    cashLocations.splice(index, 1);
    this.setState({ cashLocations });
  };

  onUploadAttempt = () => this.setState({ uploadInProgress: true });

  onUploadSuccess = imageUrl => {
    this.setState({
      detail: { ...this.state.details, imageUrl },
      uploadInProgress: false,
    });
  };

  render() {
    const {
      pricing,
      detail,
      promoCodes,
      pickupZipcodes,
      cashLocations,
      currentZipcode,
    } = this.state;
    const imageUrl = detail.imageUrl;
    return (
      <form>
        <TripFormSection>
          <H6>Name</H6>
          {this.fieldFor('name')}
          <H6>Location</H6>
          {this.fieldFor('location')}
        </TripFormSection>
        <TripFormSection>
          <H3>Date & Time</H3>
          <TripTimeSelector onChange={time => this.setState({ time })} />
        </TripFormSection>
        <TripFormSection>
          <H3>Capacity</H3>
          <H6>Available Spots</H6>
          {this.fieldFor('capacity')}
        </TripFormSection>
        <TripFormSection>
          <H3>Base Pricing</H3>
          <PricingForm pricing={pricing} />
        </TripFormSection>
        <TripFormSection>
          <H3>Promo Codes</H3>
          <PromoCodeGrid codes={promoCodes} onDelete={this.onDeletePromoCode} />
          <PricingForm promo onAddPromoCode={this.onAddPromoCode} />
        </TripFormSection>
        <TripFormSection>
          <H3>Difficulty and Statistics</H3>
          <H6>Difficulty</H6>
          {this.fieldFor('difficulty')}
          <GridParent>
            <Column>
              <H6>Distance</H6>
              {this.fieldFor('hikeDistance', 'stats')}
            </Column>
            <Column>
              <H6>Elevation</H6>
              {this.fieldFor('elevation', 'stats')}
            </Column>
          </GridParent>
        </TripFormSection>
        <TripFormSection>
          <H3>Content</H3>
          <H6>Title</H6>
          {this.fieldFor('title', 'detail')}
          <H6>Body</H6>
          {this.fieldFor('body', 'detail', TextArea)}
          <H6>Image</H6>
          <ImageDropzone
            onUploadAttempt={this.onUploadAttempt}
            onUploadSuccess={this.onUploadSuccess}
          >
            Drag and drop an image or click to select one
          </ImageDropzone>
          {imageUrl && <PreviewImage src={imageUrl} />}
        </TripFormSection>
        <TripFormSection>
          <H3>Pickup Radius</H3>
          <ZipcodeList
            zipcodes={pickupZipcodes}
            onDelete={this.onDeleteZipcode}
          />
          <ZipcodeForm onAddZipcode={this.onAddZipcode} />
        </TripFormSection>
        <TripFormSection>
          <H3>Cash Locations</H3>
          <CashLocationList
            locations={cashLocations}
            onDelete={this.onDeleteCashLocation}
          />
        </TripFormSection>
      </form>
    );
  }
}

export default TripForm;

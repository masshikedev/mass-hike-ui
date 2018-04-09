import React, { Component } from 'react';
import ImageDropzone from '../ImageDropzone';
import TripTimeSelector from './TripTimeSelector';
import PricingForm from './PricingForm';
import PromoCodeGrid from './PromoCodeGrid';
import ZipcodeList from './ZipcodeList';
import CashLocationList from './CashLocationList';
import ZipcodeForm from './ZipcodeForm';
import AvailabilityForm from './AvailabilityForm';
import ValidatedTextInput from '../forms/ValidatedTextInput';
import { validate } from 'validate.js';
import { tripConstraints } from '../../utils/validationConstraints';
import emptyTrip from '../../data/emptyTrip';
import {
  P,
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
      messages: [],
    };
  }

  onChangeField = (fieldName, parent) => {
    return e => {
      const newState = parent
        ? { [parent]: { ...this.state[parent], [fieldName]: e.target.value } }
        : { [fieldName]: e.target.value };
      this.setState(newState);
    };
  };

  fieldFor = (fieldName, title, messages, parent, useTextArea) => {
    const base = parent ? this.state[parent] : this.state;
    const constraintsKey = parent ? `${parent}.${fieldName}` : fieldName;
    return (
      <ValidatedTextInput
        title={title}
        value={base[fieldName]}
        onChange={this.onChangeField(fieldName, parent)}
        error={messages[constraintsKey]}
      />
    );
  };

  timeErrors(messages) {
    const allMessages = [].concat(
      messages['time.pickupStart'],
      messages['time.pickupEnd'],
      messages['time.hikeStart'],
      messages['time.hikeEnd'],
      messages['time.dropoffStart'],
      messages['time.dropoffEnd']
    );
    return allMessages.filter((message, index, array) => {
      return array.indexOf(message) === index;
    });
  }

  onChangePricing = pricingFormState => {
    const { errors, promoCode, ...pricing } = pricingFormState;
    this.setState({ pricing });
  };

  onAddPromoCode = options => {
    this.setState({ promoCodes: this.state.promoCodes.concat([options]) });
  };

  onDeletePromoCode = index => {
    const { promoCodes } = this.state;
    promoCodes.splice(index, 1);
    this.setState({ promoCodes });
  };

  pricingErrors(messages) {
    return [].concat(
      messages['pricing.min'],
      messages['pricing.max'],
      messages['pricing.suggestion1'],
      messages['pricing.suggestion2'],
      messages['pricing.suggestion3']
    );
  }

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

  onUploadError = () => this.setState({ uploadInProgress: false });

  onClickConfirm = e => {
    e.preventDefault();
    const { onConfirm } = this.props;
    console.log(onConfirm);
    onConfirm(this.state);
  };

  render() {
    const {
      pricing,
      detail,
      promoCodes,
      pickupZipcodes,
      cashLocations,
      currentZipcode,
      uploadInProgress,
    } = this.state;
    const imageUrl = detail.imageUrl;
    const messages =
      validate(this.state, tripConstraints(this.state)) || 'valid';
    console.log(this.state);
    return (
      <form>
        <TripFormSection>
          {this.fieldFor('name', 'Name', messages)}
          {this.fieldFor('location', 'Location', messages)}
        </TripFormSection>
        <TripFormSection>
          <H3>Date & Time</H3>
          <TripTimeSelector
            onChange={time => this.setState({ time })}
            errors={this.timeErrors(messages)}
          />
        </TripFormSection>
        <TripFormSection>
          <H3>Capacity</H3>
          {this.fieldFor('capacity', 'Capacity', messages)}
        </TripFormSection>
        <TripFormSection>
          <H3>Base Pricing</H3>
          <PricingForm
            pricing={pricing}
            errors={this.pricingErrors(messages)}
            onChange={this.onChangePricing}
          />
        </TripFormSection>
        <TripFormSection>
          <H3>Promo Codes</H3>
          <PromoCodeGrid codes={promoCodes} onDelete={this.onDeletePromoCode} />
          <PricingForm promo onAddPromoCode={this.onAddPromoCode} />
        </TripFormSection>
        <TripFormSection>
          <H3>Difficulty and Statistics</H3>
          {this.fieldFor('difficulty', 'Difficulty', messages)}
          <GridParent>
            <Column>
              {this.fieldFor(
                'hikeDistance',
                'Distance (mi)',
                messages,
                'stats'
              )}
            </Column>
            <Column>
              {this.fieldFor('elevation', 'Elevation (ft)', messages, 'stats')}
            </Column>
          </GridParent>
        </TripFormSection>
        <TripFormSection>
          <H3>Content</H3>
          {this.fieldFor('title', 'Title', messages, 'detail')}
          {this.fieldFor('body', 'Body', messages, 'detail', TextArea)}
          <H6>Image</H6>
          <ImageDropzone
            onUploadAttempt={this.onUploadAttempt}
            onUploadSuccess={this.onUploadSuccess}
            onUploadError={this.onUploadError}
          >
            Drag and drop an image or click to select one
          </ImageDropzone>
          {uploadInProgress && <P>Loading...</P>}
          {imageUrl && <PreviewImage src={imageUrl} />}
        </TripFormSection>
        <TripFormSection>
          <H3>Pickup Radius</H3>
          <ZipcodeList
            zipcodes={pickupZipcodes}
            onDelete={this.onDeleteZipcode}
          />
          <ZipcodeForm
            onAddZipcode={this.onAddZipcode}
            error={messages.pickupZipcodes}
          />
        </TripFormSection>
        <TripFormSection>
          <H3>Cash Locations</H3>
          <CashLocationList
            locations={cashLocations}
            onDelete={this.onDeleteCashLocation}
          />
          <H3>Availability</H3>
          <AvailabilityForm
            onChange={availability =>
              this.setState({ cashAvailability: availability })
            }
          />
        </TripFormSection>
        <TripFormSection>
          {messages === 'valid' && (
            <Button onClick={this.onClickConfirm}>Create Trip</Button>
          )}
        </TripFormSection>
      </form>
    );
  }
}

export default TripForm;

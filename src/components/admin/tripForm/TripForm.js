import React, { Component } from 'react';
import ImageDropzone from '../../forms/ImageDropzone';
import TripTimeSelector from './TripTimeSelector';
import PricingForm from './PricingForm';
import PromoCodeGrid from './PromoCodeGrid';
import ZipcodeList from './ZipcodeList';
import ZipcodeForm from './ZipcodeForm';
import ValidatedTextInput from '../../forms/ValidatedTextInput';
import { validate } from 'validate.js';
import { tripConstraints } from '../../../utils/validationConstraints';
import emptyTrip from '../../../data/emptyTrip';
import { P, H5, H6, Button, GridParent, Img } from '../../../style';
import styled from 'styled-components';

const TripFormSection = styled.div`
  margin-bottom: 30px;
`;

const Column = styled.div`
  grid-column: span 4;
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
        textarea={useTextArea}
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
    console.log(zipcode);
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
      detail: { ...this.state.detail, imageUrl },
      uploadInProgress: false,
    });
  };

  onUploadError = () => this.setState({ uploadInProgress: false });

  onClickConfirm = e => {
    e.preventDefault();
    const { onConfirm } = this.props;
    onConfirm(this.state);
  };

  render() {
    const {
      pricing,
      detail,
      promoCodes,
      pickupZipcodes,
      cashLocations,
      uploadInProgress,
      cashAvailability,
    } = this.state;
    const { buttonText } = this.props;
    const imageUrl = detail.imageUrl;
    const messages =
      validate(this.state, tripConstraints(this.state)) || 'valid';
    return (
      <form>
        <TripFormSection>
          {this.fieldFor('name', 'Name', messages)}
          {this.fieldFor('location', 'Location', messages)}
        </TripFormSection>
        <TripFormSection id="time">
          <H5>Date & Time</H5>
          <TripTimeSelector
            onChange={time => this.setState({ time })}
            errors={this.timeErrors(messages)}
          />
        </TripFormSection>
        <TripFormSection id="capacity">
          <H5>Capacity</H5>
          {this.fieldFor('capacity', 'Capacity', messages)}
        </TripFormSection>
        <TripFormSection id="pricing">
          <H5>Base Pricing</H5>
          <PricingForm
            pricing={pricing}
            errors={this.pricingErrors(messages)}
            onChange={this.onChangePricing}
          />
        </TripFormSection>
        <TripFormSection id="promo-codes">
          <H5>Promo Codes</H5>
          <PromoCodeGrid
            codes={promoCodes}
            onDelete={this.onDeletePromoCode}
            showDelete
          />
          <PricingForm promo onAddPromoCode={this.onAddPromoCode} />
        </TripFormSection>
        <TripFormSection id="stats">
          <H5>Difficulty and Statistics</H5>
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
        <TripFormSection id="content">
          <H5>Content</H5>
          {this.fieldFor('title', 'Title', messages, 'detail')}
          {this.fieldFor('body', 'Body', messages, 'detail', true)}
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
        <TripFormSection id="pickup-radius">
          <H5>Pickup Radius</H5>
          <ZipcodeList
            zipcodes={pickupZipcodes}
            onDelete={this.onDeleteZipcode}
            showDelete
          />
          <ZipcodeForm
            onAddZipcode={this.onAddZipcode}
            error={messages.pickupZipcodes}
          />
        </TripFormSection>
        <TripFormSection>
          {messages === 'valid' && (
            <Button onClick={this.onClickConfirm}>{buttonText}</Button>
          )}
          {messages !== 'valid' && (
            <P color="error">
              Some selections are invalid. Please correct all invalid
              information
            </P>
          )}
        </TripFormSection>
      </form>
    );
  }
}

export default TripForm;

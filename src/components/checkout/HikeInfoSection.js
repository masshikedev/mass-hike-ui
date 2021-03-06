import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import BaseCheckoutSection from './BaseCheckoutSection';
import {
  setCurrentSection,
  setCheckoutState,
} from '../../actions/CheckoutActions';
import { P, H2, H6 } from '../../style';
import { validate } from 'validate.js';
import { hikeConstraints } from '../../utils/validationConstraints';
import PlaceAutocomplete from '../forms/PlaceAutocomplete';
import {
  Checkbox,
  ValidatedTextInput,
  NextButton,
  BackButton,
  ButtonSpacer,
  CheckBoxWrapper,
} from '../forms';

const Caption = P.extend`
  max-width: 500px;
`;

class HikeInfoSection extends BaseCheckoutSection {
  constructor(props) {
    super(props);
    const { tickets, kids, pickupLocation, zipCode } = props;
    this.state = {
      tickets,
      pickupLocation,
      zipCode,
      kids,
      edited: false,
    };
  }

  setZipCodeFromPlace(place) {
    const add_comp = place.address_components;
    for (let comp of add_comp) {
      if (comp.types.includes('postal_code')) {
        const zipCode = comp.short_name;
        this.setState({ zipCode });
        return;
      }
    }
    this.setState({ zipCode: '' });
  }

  messages() {
    const { trip } = this.props;
    return validate(this.state, hikeConstraints(trip)) || 'valid';
  }

  render() {
    const { trip } = this.props;
    const { tickets, kids, pickupLocation, edited } = this.state;
    const messages = this.messages();

    return (
      <div>
        <H2>Hike Information</H2>
        <H6>How many tickets would you like to purchase?</H6>
        <P size="medium" proxima>
          {trip.capacity - trip.ticketsSold} available
        </P>
        <ValidatedTextInput
          title=""
          value={tickets}
          onChange={e => this.setState({ tickets: e.target.value })}
          error={messages['tickets']}
          short
        />

        <H6>Are any of the tickets for children 12 or under?</H6>
        <CheckBoxWrapper>
          <Checkbox
            type="radio"
            checked={kids === '' || kids > 0}
            onChange={() => this.setState({ kids: '' })}
            text="Yes"
          />
          {(kids === '' || kids > 0) && (
            <ValidatedTextInput
              title=""
              placeholder="Amount"
              value={kids}
              onChange={e => {
                this.setState({ kids: e.target.value, edited: true });
              }}
              short
              smallBottomMargin
            />
          )}
          <Checkbox
            type="radio"
            checked={kids === 0}
            onChange={() => this.setState({ kids: 0 })}
            text="No"
          />
        </CheckBoxWrapper>
        {messages['kids'] &&
          edited && (
            <P proxima leftmargin size="medium" color="error">
              {messages['kids'][0]}
            </P>
          )}

        <H6>What is your prefered address for pickup?</H6>
        <Caption size="medium" proxima>
          Your final pickup location will be within 15 minutes of this address
          and will be sent to you before your hike.
        </Caption>

        <PlaceAutocomplete
          value={pickupLocation}
          onChange={address =>
            this.setState({ pickupLocation: address, zipCode: '' })
          }
          callback={place => this.setZipCodeFromPlace(place)}
          error={messages['zipCode']}
        />
        <ButtonSpacer>
          <BackButton
            onClick={e => this.onBackSection(e, messages === 'valid')}
            active={true}
          />
          <NextButton
            onClick={this.onCompleteSection}
            active={messages === 'valid'}
            hideOnMobile={!this.onFurthestSection()}
          />
        </ButtonSpacer>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  tickets: state.checkout.tickets,
  kids: state.checkout.kids,
  pickupLocation: state.checkout.pickupLocation,
  zipCode: state.checkout.zipCode,
  trip: state.currentTrip.trip,
  highestCompletedSection: state.checkout.highestCompletedSection,
});

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      setCurrentSection,
      setCheckoutState,
    },
    dispatch
  );

export default connect(mapStateToProps, mapDispatchToProps)(HikeInfoSection);

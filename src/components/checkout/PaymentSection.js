import React, { Component } from 'react';
import { connect } from 'react-redux';
import { P, H3, H6, Input, Button } from '../../style';
import trips from '../../data/trips';

class PaymentSection extends Component {
  constructor(props) {
    super(props);
    const {
      cardNumber,
      expiration,
      cvv,
      billingZip,
      selectedLocation,
      showMoreLocations,
      meetingDate,
    } = props;
    this.state = {
      cardNumber,
      expiration,
      cvv,
      billingZip,
      selectedLocation,
      showMoreLocations,
      meetingDate,
    };

    // This binding is necessary to make `this` work in the callback
    this.handleToggle = this.handleToggle.bind(this);
  }

  handleToggle(e) {
    e.preventDefault();
    this.setState(prevState => ({
      showMoreLocations: !prevState.showMoreLocations,
    }));
  }

  handleChooseDate(e) {
    e.preventDefault();
    this.setState(prevState => ({ meetingDate: e.date }));
  }

  renderCashLocations(maxLoc) {
    const tripId = this.props.tripId;
    const cashLocations = trips[tripId]['cashLocations'];
    let locList = [];
    for (let i = 0; i < maxLoc && i < cashLocations.length; i++) {
      let loc = cashLocations[i];
      locList.push(
        <label htmlFor={loc.name} key={i}>
          <input
            type="radio"
            id={loc.name}
            checked={this.state.selectedLocation === i}
            onChange={e => this.setState({ selectedLocation: i })}
          />
          {'  '}
          {loc.name}
          <P small>
            {loc.location}
            {' - '}
            <a href={loc.link} target="_blank">
              Get Directions
            </a>
          </P>
        </label>
      );
    }
    return locList;
  }

  render() {
    const {
      showNextButton,
      onClickNextButton,
      paymentType,
      tripId,
    } = this.props;
    const { showMoreLocations, selectedLocation } = this.state;
    const cashLocations = trips[tripId]['cashLocations'];
    return (
      <div>
        {paymentType === 'card' && (
          <div>
            <H3>Enter your credit card information</H3>
            <label>
              <H6>Card Number</H6>
              <Input
                type="text"
                value={this.state.cardNumber}
                onChange={e => this.setState({ cardNumber: e.target.value })}
              />
            </label>
            <label>
              <H6>Expiration</H6>
              <Input
                type="text"
                value={this.state.expiration}
                onChange={e => this.setState({ expiration: e.target.value })}
              />
            </label>
            <label>
              <H6>Security Code</H6>
              <Input
                type="text"
                value={this.state.cvv}
                onChange={e => this.setState({ cvv: e.target.value })}
              />
            </label>
            <label>
              <H6>Billing Zip</H6>
              <Input
                type="text"
                value={this.state.billingZip}
                onChange={e => this.setState({ billingZip: e.target.value })}
              />
            </label>
          </div>
        )}
        {paymentType === 'cash' && (
          <div>
            <H3>
              To pay in cash, you must meet a Mass Hike team member at a local
              Boston Center for Youth and Families. Please select the center
              most convient for you.
            </H3>

            <fieldset>
              {this.renderCashLocations(
                showMoreLocations ? cashLocations.length : 3
              )}
            </fieldset>
            <Button small onClick={e => this.handleToggle(e)}>
              {showMoreLocations ? 'Show Less' : 'Show More'}
            </Button>
          </div>
        )}
        {selectedLocation >= 0 && (
          <div>
            <Button onClick={e => this.handleChooseDate(e)} date="March 2nd">
              Choose March 2nd
            </Button>
          </div>
        )}
        {(showNextButton(this.state) || paymentType === 'cash') && (
          <Button onClick={() => onClickNextButton(this.state)}>Next</Button>
        )}
      </div>
    );
  }
}

const mapStateToProps = state => ({
  paymentType: state.checkout.paymentType,
  cardNumber: state.checkout.cardNumber,
  expiration: state.checkout.expiration,
  cvv: state.checkout.cvv,
  billingZip: state.checkout.billingZip,

  selectedLocation: state.checkout.selectedLocation,
  showMoreLocations: state.checkout.showMoreLocations,
});

export default connect(mapStateToProps)(PaymentSection);

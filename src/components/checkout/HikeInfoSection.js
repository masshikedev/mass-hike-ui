import React, { Component } from 'react';
import { connect } from 'react-redux';
import { H3, Input, Button } from '../../style';
import trips from '../../data/trips';

class HikeInfoSection extends Component {
  constructor(props) {
    super(props);
    const { tickets, pickupLocation } = props;
    this.state = {
      tickets,
      pickupLocation,
    };
  }

  renderTicketOptions(trip) {
    let options = [<option value="">-- Select --</option>];
    for (let i = 1; i <= trip.capacity - trip.ticketsSold; i++) {
      options.push(<option value={i}>{i}</option>);
    }
    return (
      <select
        value={this.state.tickets}
        onChange={e => this.setState({ tickets: e.target.value })}
      >
        {options}
      </select>
    );
  }

  renderZipcodeOptions(trip, max) {
    let zips = [];
    for (let i = 0; i < trip.pickupZipcodes && i < max; i++) {
      zips.push(
        <label htmlFor={i} key={i}>
          <input type="radio" />
        </label>
      );
    }
    return zips;
  }

  render() {
    const { showNextButton, onClickNextButton, tripId } = this.props;
    const trip = trips[tripId];
    return (
      <div>
        <H3>How many tickets would you like to purchase?</H3>
        {this.renderTicketOptions(trip)}
        <H3>In what zipcode would you liked to be picked up?</H3>
        <Input
          type="text"
          value={this.state.pickupLocation}
          onChange={e => this.setState({ pickupLocation: e.target.value })}
        />

        <br />
        {showNextButton(this.state) && (
          <Button onClick={() => onClickNextButton(this.state)}>Next</Button>
        )}
      </div>
    );
  }
}

const mapStateToProps = state => ({
  tickets: state.checkout.tickets,
  pickupLocation: state.checkout.pickupLocation,
});

export default connect(mapStateToProps)(HikeInfoSection);

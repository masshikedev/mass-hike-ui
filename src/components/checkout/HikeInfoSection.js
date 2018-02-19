import React, { Component } from 'react';
import { connect } from 'react-redux';
import H2 from '../../style/H2';
import H3 from '../../style/H3';
import H6 from '../../style/H6';
import Input from '../../style/Input';
import Button from '../../style/Button';
import styled from 'styled-components';

class HikeInfoSection extends Component {
  constructor(props) {
    super(props);
    const { tickets, pickupLocation } = props;
    this.state = {
      tickets,
      pickupLocation,
    };
  }

  render() {
    const { showNextButton, onClickNextButton } = this.props;
    return (
      <div>
        <H3>How many tickets would you like to purchase?</H3>
        <select
          value={this.state.tickets}
          onChange={e => this.setState({ tickets: e.target.value })}
        >
          <option value="">-- Select --</option>
          <option value={1}>1</option>
          <option value={2}>2</option>
          <option value={3}>3</option>
          <option value={4}>4</option>
        </select>
        <h3>Where is your preferred pickup location?</h3>
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

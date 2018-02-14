import React, { Component } from 'react';
import { connect } from 'react-redux';

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
        <h3>How many tickets would you like to purchase?</h3>
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
        <input
          type="text"
          value={this.state.pickupLocation}
          onChange={e => this.setState({ pickupLocation: e.target.value })}
        />
        {showNextButton(this.state) && (
          <button onClick={() => onClickNextButton(this.state)}>Next</button>
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

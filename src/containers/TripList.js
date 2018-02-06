import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { decrementTripSpaces } from '../actions/ExampleActions';

class TripList extends Component {
  render() {
    const { ticketsLeft, decrementTripSpaces } = this.props;
    return (
      <div>
        <p>This is the trip list page</p>
        <p>{`Tickets left: ${ticketsLeft}`}</p>
        <br />
        <button onClick={decrementTripSpaces}>Reserve ticket</button>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  ticketsLeft: state.example.ticketsLeft,
});
const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      decrementTripSpaces,
    },
    dispatch
  );

export default connect(mapStateToProps, mapDispatchToProps)(TripList);

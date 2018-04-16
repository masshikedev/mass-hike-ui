import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import TripForm from '../tripForm/TripForm';
import { adminEditTrip } from '../../../actions/CurrentTripActions';
import buildTrip from '../../../utils/buildTrip';

const SECTION = 2;

class EditTrip extends Component {
  componentWillMount() {
    const { setCurrentSection } = this.props;
    setCurrentSection(SECTION);
  }

  onConfirm = attributes => {
    const { editTrip, trip } = this.props;
    editTrip(trip.tripId, buildTrip(attributes));
  };

  render() {
    const { trip } = this.props;
    return (
      <TripForm
        trip={trip}
        onConfirm={this.onConfirm}
        buttonText="Confirm edits"
      />
    );
  }
}

const mapDispatchToProps = dispatch =>
  bindActionCreators({ editTrip: adminEditTrip }, dispatch);

export default connect(null, mapDispatchToProps)(EditTrip);

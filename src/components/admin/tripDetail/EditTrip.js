import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import TripForm from '../tripForm/TripForm';
import CancelTrip from '../tripForm/CancelTrip';
import { adminEditTrip } from '../../../actions/CurrentTripActions';
import buildTrip from '../../../utils/buildTrip';
import { H3 } from '../../../style';

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

  onCancel = () => {
    const { editTrip, trip } = this.props;
    editTrip(trip.tripId, { cancelled: true });
  };

  render() {
    const { trip } = this.props;
    if (trip.cancelled) {
      return <H3>This trip has been cancelled and cannot be edited.</H3>;
    } else if (trip.time.hikeStart < Date.now()) {
      return <H3>Past trips cannot be edited.</H3>;
    }
    return (
      <div>
        <TripForm
          trip={trip}
          onConfirm={this.onConfirm}
          buttonText="Confirm edits"
        />
        <CancelTrip trip="trip" onCancel={this.onCancel} />
      </div>
    );
  }
}

const mapDispatchToProps = dispatch =>
  bindActionCreators({ editTrip: adminEditTrip }, dispatch);

export default connect(null, mapDispatchToProps)(EditTrip);

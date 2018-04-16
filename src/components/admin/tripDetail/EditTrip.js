import React, { Component } from 'react';
import { connect } from 'react-redux';
import TripForm from '../tripForm/TripForm';

const SECTION = 2;

class EditTrip extends Component {
  componentWillMount() {
    const { setCurrentSection } = this.props;
    setCurrentSection(SECTION);
  }

  onConfirm = attributes => {
    const { createTrip } = this.props;
    return null;
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

const mapDispatchToProps = () => null;

export default connect(null, mapDispatchToProps)(EditTrip);

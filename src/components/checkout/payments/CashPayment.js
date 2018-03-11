import React, { Component } from 'react';
import { connect } from 'react-redux';
import { P, H3, Button } from '../../../style';

class CashPayment extends Component {
  constructor(props) {
    super(props);
    const { selectedLocation, meetingDate } = props;
    this.state = {
      selectedLocation,
      showMoreLocations: false,
      meetingDate,
    };
  }

  handleToggle(e) {
    e.preventDefault();
    this.setState(prevState => ({
      showMoreLocations: !prevState.showMoreLocations,
    }));
  }

  handleChooseDate(e, date) {
    e.preventDefault();
    this.setState(prevState => ({ meetingDate: date }));
  }

  renderCashLocations(maxLoc) {
    const { trip } = this.props;
    const cashLocations = trip.cashLocations;
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
    const { showNextButton, onClickNextButton, trip } = this.props;
    const { showMoreLocations, selectedLocation } = this.state;
    const cashLocations = trip.cashLocations;

    return (
      <div>
        <H3>
          To pay in cash, you must meet a Mass Hike team member at a local
          Boston Center for Youth and Families. Please select the center most
          convient for you.
        </H3>

        <fieldset>
          {this.renderCashLocations(
            showMoreLocations ? cashLocations.length : 3
          )}
        </fieldset>
        <Button small onClick={e => this.handleToggle(e)}>
          {showMoreLocations ? 'Show Less' : 'Show More'}
        </Button>

        {selectedLocation >= 0 && (
          <div>
            <Button onClick={e => this.handleChooseDate(e, 'March 2nd')}>
              Choose March 2nd
            </Button>
          </div>
        )}
        {showNextButton(this.state) && (
          <Button onClick={e => onClickNextButton(this.state, e)}>Next</Button>
        )}
      </div>
    );
  }
}

const mapStateToProps = state => ({
  selectedLocation: state.checkout.selectedLocation,
  meetingDate: state.checkout.meetingDate,
  trip: state.currentTrip.trip,
});

export default connect(mapStateToProps)(CashPayment);

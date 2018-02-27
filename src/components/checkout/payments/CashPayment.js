import React, { Component } from 'react';
import { connect } from 'react-redux';
import { P, H3, Button } from '../../../style';
import trips from '../../../data/trips';

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
    const { showNextButton, onClickNextButton, tripId } = this.props;
    const { showMoreLocations, selectedLocation } = this.state;
    const cashLocations = trips[tripId]['cashLocations'];

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
          <Button onClick={() => onClickNextButton(this.state)}>Next</Button>
        )}
      </div>
    );
  }
}

const mapStateToProps = state => ({
  selectedLocation: state.checkout.selectedLocation,
  meetingDate: state.checkout.meetingDate,
});

export default connect(mapStateToProps)(CashPayment);
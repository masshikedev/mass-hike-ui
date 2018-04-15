import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import BaseCheckoutSection from '../BaseCheckoutSection';
import { setCurrentSection } from '../../../actions/CheckoutActions';
import { P, H2, H6, Button } from '../../../style';
import { NextButton, BackButton, ButtonSpacer } from '../../forms';

class CashPayment extends BaseCheckoutSection {
  constructor(props) {
    super(props);
    const { selectedLocationIndex, meetingDate } = props;
    this.state = {
      selectedLocationIndex,
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
            checked={this.state.selectedLocationIndex === i}
            onChange={e => this.setState({ selectedLocationIndex: i })}
          />
          {'  '}
          {loc.name}
          <P small>
            {loc.address}
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
    const { trip } = this.props;
    const { showMoreLocations, selectedLocationIndex } = this.state;
    const cashLocations = trip.cashLocations;

    return (
      <div>
        <H2>Payment Info</H2>
        <P size="medium" proxima>
          To pay in cash, you must meet a Mass Hike team member at a local
          Boston Center for Youth and Families. Please select the center most
          convient for you.
        </P>
        <H6>Please select the center most convient for you.</H6>
        <fieldset>
          {this.renderCashLocations(
            showMoreLocations ? cashLocations.length : 3
          )}
        </fieldset>
        <Button small color="blue" onClick={e => this.handleToggle(e)}>
          {showMoreLocations ? 'See Less' : 'See More'}
        </Button>

        {selectedLocationIndex >= 0 && (
          <div>
            <Button onClick={e => this.handleChooseDate(e, 'March 2nd')}>
              Choose March 2nd
            </Button>
          </div>
        )}
        <br />
        <ButtonSpacer>
          <BackButton
            onClick={e => this.onBackSection(e, true)}
            active={true}
          />
          <NextButton onClick={this.onCompleteSection} active={true} />
        </ButtonSpacer>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  selectedLocationIndex: state.checkout.selectedLocationIndex,
  meetingDate: state.checkout.meetingDate,
  trip: state.currentTrip.trip,
});

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      setCurrentSection,
    },
    dispatch
  );

export default connect(mapStateToProps, mapDispatchToProps)(CashPayment);

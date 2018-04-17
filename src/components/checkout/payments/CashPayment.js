import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import BaseCheckoutSection from '../BaseCheckoutSection';
import { setCurrentSection } from '../../../actions/CheckoutActions';
import { P, H3, Button, constants } from '../../../style';
import DayPicker from 'react-day-picker';
import 'react-day-picker/lib/style.css';
import { DAY_PICKER_DATE_CORRECTION } from '../../../constants';
import { MONTH_DATE_YEAR, TIME } from '../../../utils/dateFormats';
import Helmet from 'react-helmet';

function Weekday({ weekday, className, localeUtils, locale }) {
  const weekdayName = localeUtils.formatWeekdayLong(weekday, locale);
  return (
    <div className={className} title={weekdayName}>
      {weekdayName.slice(0, 3)}
    </div>
  );
}

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

  availableDays() {
    const { trip } = this.props;
    return trip.cashAvailability.map(
      dayData => new Date(dayData.date + DAY_PICKER_DATE_CORRECTION)
    );
  }

  isDisabledDate(day) {
    for (let d of this.availableDays()) {
      if (d.getTime() === day.getTime()) return false;
    }
    return true;
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

  renderCalendar() {
    const { trip } = this.props;
    const { meetingDate } = this.state;
    console.log(this.availableDays());
    return (
      <div>
        <Helmet>
          <style>{`
          .DayPicker-wrapper {
            background: ${constants.green} ${constants.greenBg};
            background-blend-mode: multiply;
            border-radius: 15px;
          }
          .DayPicker-Caption {
            text-align: center;
            color: white;
            font-family: 'proxima-nova';
            font-weight: 700;
          }
          .DayPicker-NavButton {
            color: white;
          }
          .DayPicker-NavButton--prev {
            left: 1.5rem;
          }
          .DayPicker-Weekday {
            color: white;
            text-transform: uppercase;
            font-size: 0.65em;
            font-family: 'proxima-nova';
            width: 35px;
          }
          .DayPicker-Body {
            background-color: ${constants.gray}
          }
          .DayPicker-Month {
            margin: 1rem 0 0 0;
          }
          .DayPicker-Day {
            box-sizing: border-box;
            border: 2px solid ${constants.lightgreen};
            font-family: 'proxima-nova';
            font-size: 16px;
            padding: 15px 0px;
          }
          .DayPicker-Day--highlighted {
            background-color: ${constants.verylightgreen};
          }
          .DayPicker-Day--selected:not(.DayPicker-Day--disabled):not(.DayPicker-Day--outside) {
            background-color: ${constants.lightergreen};
            border-radius: 0;
          }
          .DayPicker-Day--today {
            color: 'inherit';
          }
          `}</style>
        </Helmet>
        <DayPicker
          onDayClick={(day, { selected }) =>
            this.setState({
              meetingDate: selected ? undefined : day,
            })
          }
          selectedDays={meetingDate}
          modifiers={{ highlighted: this.availableDays() }}
          disabledDays={d => this.isDisabledDate(d)}
          weekdayElement={<Weekday />}
        />
      </div>
    );
  }

  renderTime() {}

  render() {
    const { trip } = this.props;
    const { showMoreLocations, selectedLocationIndex } = this.state;
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
        {this.renderCalendar()}
        <br />
        {true && <Button onClick={this.onCompleteSection}>Next</Button>}
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

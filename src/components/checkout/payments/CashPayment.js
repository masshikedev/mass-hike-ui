import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import BaseCheckoutSection from '../BaseCheckoutSection';
import {
  setCurrentSection,
  setCheckoutState,
} from '../../../actions/CheckoutActions';
import { P, H2, H6, Button, MediaQueries, constants } from '../../../style';
import { NextButton, BackButton, ButtonSpacer } from '../../forms';
import styled from 'styled-components';
import DayPicker from 'react-day-picker';
import TimePicker from 'rc-time-picker';
import moment from 'moment';
import 'react-day-picker/lib/style.css';
import { TWELVE_HOUR_CORRECTION, ONE_DAY_CORRECTION } from '../../../constants';
import Helmet from 'react-helmet';
import { cashPaymentContraints } from '../../../utils/validationConstraints';
import { MONTH_DATE_YEAR } from '../../../utils/dateFormats';
import { validate } from 'validate.js';

const LocationLabel = styled.label`
  display: flex;
  flex-direction: row;
  align-items: center;
`;

const LocationDetails = styled.div`
  margin-left: 10px;
`;

const DirectionsLink = styled.a`
  color: ${constants.blue};
  &:visited {
    color: ${constants.blue};
  }
`;

const CalWrapper = styled.div``;

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
      times: [],
    };
  }

  handleToggle(e) {
    e.preventDefault();
    this.setState(prevState => ({
      showMoreLocations: !prevState.showMoreLocations,
    }));
  }

  handleChooseDate(date) {
    if (!this.isDisabledDate(date)) {
      this.setState(
        {
          meetingDate: moment(date.getTime())
            .utc()
            .valueOf(),
        },
        () => {
          const times = this.getTimes();
          if (times[0]) {
            let time = times[0].start;
            this.setState({
              meetingDate:
                moment(date.getTime())
                  .hour(0)
                  .minute(0)
                  .second(0)
                  .millisecond(0)
                  .valueOf() + time,
              times,
            });
          }
        }
      );
    }
  }

  toLocal(date) {
    let z = moment().utcOffset();
    return moment(date).valueOf() - z * 60000;
  }

  toUTC(date) {
    let z = moment().utcOffset();
    return moment(date).valueOf() + z * 60000;
  }

  availableDays() {
    const { availableTimes, trip } = this.props;
    return availableTimes
      .filter(({ times }) => times.length)
      .filter(
        ({ date }) =>
          date >= moment().valueOf() &&
          date < trip.time.pickupStart - ONE_DAY_CORRECTION
      )
      .map(({ date }) => new Date(this.toLocal(date)));
  }

  isDisabledDate(day) {
    for (let d of this.availableDays()) {
      if (d.getTime() === day.getTime() - TWELVE_HOUR_CORRECTION) return false;
    }
    return true;
  }

  getTimes() {
    const { availableTimes } = this.props;
    const { meetingDate } = this.state;
    for (let { date, times } of availableTimes) {
      if (this.toLocal(date) === meetingDate - TWELVE_HOUR_CORRECTION) {
        return times.sort((a, b) => a.start - b.start);
      }
    }
  }

  disabledHours() {
    const { times } = this.state;
    if (!times) return [];
    let hours = [...Array(24).keys()];
    return hours.filter(
      hour =>
        !times.reduce((acc, { start, end }) => {
          const startHr = Math.floor(start / 3600000);
          const endHr = Math.floor(end / 3600000);
          return acc || (hour >= startHr && hour <= endHr);
        }, false)
    );
  }

  disabledMinutes() {
    const { times, meetingDate } = this.state;
    if (!times) return [];
    const hour = moment(meetingDate).hour() * 3600000;
    let minutes = [...Array(4).keys()].map(n => n * 15);
    return minutes.filter(
      minute =>
        !times.reduce((acc, { start, end }) => {
          const timestamp = hour + minute * 60000;
          return acc || (timestamp >= start && timestamp <= end);
        }, false)
    );
  }

  renderCashLocations(maxLoc) {
    const { availableLocations } = this.props;
    let locList = [];
    for (let i = 0; i < maxLoc && i < availableLocations.length; i++) {
      let loc = availableLocations[i];
      locList.push(
        <LocationLabel htmlFor={loc.name} key={i}>
          <input
            type="radio"
            id={loc.name}
            checked={this.state.selectedLocationIndex === i}
            onChange={e => this.setState({ selectedLocationIndex: loc.index })}
          />
          <LocationDetails>
            <P size="medium" bold proxima nobottom>
              {loc.name}
            </P>
            <P size="medium" proxima>
              {loc.address}
              {' - '}
              <DirectionsLink
                href={`https://www.google.com/maps/dir/?api=1&destination=${escape(
                  loc.address
                )}`}
                target="_blank"
              >
                Get Directions
              </DirectionsLink>
            </P>
          </LocationDetails>
        </LocationLabel>
      );
    }
    return locList;
  }

  renderCalendar() {
    const { meetingDate } = this.state;
    const avDays = this.availableDays();
    return (
      <CalWrapper>
        <Helmet>
          <style>{`
          .DayPicker-wrapper {
            background: ${constants.green} ${constants.greenBg};
            background-blend-mode: multiply;
            border-radius: 15px;
            max-width: 100%;
          }
          .DayPicker-Caption {
            text-align: center;
            color: white;
            font-family: 'proxima-nova';
            font-weight: 700;
          }
          .DayPicker-NavButton--next {
            background-image: url(/images/white-arrow.png);
            transform: rotate(90deg) scale(2);
            user-select: none;
          }
          .DayPicker-NavButton--prev {
            left: 1.5rem;
            background-image: url(/images/white-arrow.png);
            transform: rotate(-90deg) scale(2);
            user-select: none;
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
          ${MediaQueries.small} {
            .DayPicker-Day {
              box-sizing: border-box;
              border: 2px solid ${constants.lightgreen};
              font-family: 'proxima-nova';
              font-size: 11px;
              padding: 15px 0px;
            }

            .DayPicker-Weekday {
              font-size: 11px !important;
              width: 28px;
            }
          }
          `}</style>
        </Helmet>
        <DayPicker
          initialMonth={avDays ? avDays[0] : null}
          onDayClick={day => this.handleChooseDate(day)}
          selectedDays={[new Date(meetingDate)]}
          modifiers={{
            highlighted: avDays,
          }}
          disabledDays={d => this.isDisabledDate(d)}
          weekdayElement={<Weekday />}
        />
      </CalWrapper>
    );
  }

  renderTime() {
    const { meetingDate } = this.state;
    return (
      <TimePicker
        value={moment(meetingDate)}
        onChange={time => {
          time && this.setState({ meetingDate: time.valueOf() });
        }}
        disabledHours={() => this.disabledHours()}
        disabledMinutes={() => this.disabledMinutes()}
        showSecond={false}
        use12Hours={true}
        minuteStep={15}
        hideDisabledOptions={true}
      />
    );
  }

  messages() {
    const { selectedLocationIndex, meetingDate } = this.state;
    const { availableLocations, availableTimes } = this.props;
    return (
      validate(
        {
          meetingDate: this.toUTC(meetingDate),
          selectedLocationIndex,
        },
        cashPaymentContraints({
          locations: availableLocations,
          times: availableTimes,
        })
      ) || 'valid'
    );
  }

  render() {
    const {
      showMoreLocations,
      selectedLocationIndex,
      meetingDate,
    } = this.state;
    const { availableLocations } = this.props;
    const messages = this.messages();
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
            showMoreLocations ? availableLocations.length : 3
          )}
        </fieldset>
        <Button color="blue" onClick={e => this.handleToggle(e)}>
          {showMoreLocations ? 'See less' : 'See more'}
        </Button>
        <br />

        {selectedLocationIndex >= 0 && (
          <div>
            <H6>Please choose a date and time.</H6>
            {this.renderCalendar()}
            {meetingDate && (
              <div>
                <br />
                <H6>{moment(meetingDate).format(MONTH_DATE_YEAR)}</H6>
                {this.renderTime()}
                <P>
                  A Mass Hike team member will reach out to you confirming this
                  time and location.
                </P>
                <P color="error" proxima>
                  {messages.meetingDate}
                </P>
              </div>
            )}
          </div>
        )}

        <br />
        <ButtonSpacer>
          <BackButton
            onClick={e => this.onBackSection(e, true)}
            active={true}
          />
          <NextButton
            onClick={this.onCompleteSection}
            active={messages === 'valid'}
            hideOnMobile={!this.onFurthestSection()}
          />
        </ButtonSpacer>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  selectedLocationIndex: state.checkout.selectedLocationIndex,
  meetingDate: state.checkout.meetingDate,
  trip: state.currentTrip.trip,
  availableTimes: state.availability.times,
  availableLocations: state.availability.locations,
  status: state.availability.status,
  highestCompletedSection: state.checkout.highestCompletedSection,
});

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      setCurrentSection,
      setCheckoutState,
    },
    dispatch
  );

export default connect(mapStateToProps, mapDispatchToProps)(CashPayment);

import React, { Component } from 'react';
import DayPicker from 'react-day-picker';
import TimePicker from '../TimePicker';
import { P, H6, GridParent } from '../../style';
import styled from 'styled-components';
import moment from 'moment';
import { DAY_MONTH_DATE_YEAR } from '../../utils/dateFormats';

const DATE_CORRECTION = 57600000;

const Column = styled.div`
  grid-column: span 4;
`;

const DayPickerWrapper = styled.div`
  margin: 20px 0;
`;

const TimePickerWrapper = styled.div`
  margin-bottom: 20px;
`;

class TripTimeSelector extends Component {
  constructor(props) {
    super(props);
    this.state = {
      day: null,
      pickupStart: null,
      pickupEnd: null,
      hikeStart: null,
      hikeEnd: null,
      dropoffStart: null,
      dropoffEnd: null,
    };
  }

  calculateTimes = () => {
    const { day } = this.state;
    const times = {};
    if (!day) {
      return times;
    }
    for (const key in this.state) {
      if (this.state[key] && key !== 'day') {
        times[key] =
          this.state[key].utc().unix() * 1000 + day.getTime() - DATE_CORRECTION;
      }
    }
    return times;
  };

  onDayClick = day => {
    const { onChange } = this.props;
    this.setState({ day }, () => onChange(this.calculateTimes()));
  };

  onChangeTime = field => {
    const { onChange } = this.props;
    return time => {
      this.setState(
        {
          [field]: time,
        },
        () => onChange(this.calculateTimes())
      );
    };
  };

  timePickerFor = field => {
    return (
      <TimePickerWrapper>
        <TimePicker
          value={this.state[field]}
          onChange={this.onChangeTime(field)}
        />
      </TimePickerWrapper>
    );
  };

  render() {
    const { day } = this.state;
    return (
      <div>
        <DayPickerWrapper>
          <DayPicker onDayClick={this.onDayClick} selectedDays={[day]} />
          <P>{day && moment(day).format(DAY_MONTH_DATE_YEAR)}</P>
        </DayPickerWrapper>
        <GridParent>
          <Column>
            <H6>Pickup Start</H6>
            {this.timePickerFor('pickupStart')}
            <H6>Pickup End</H6>
            {this.timePickerFor('pickupEnd')}
          </Column>
          <Column>
            <H6>Hike Start</H6>
            {this.timePickerFor('hikeStart')}
            <H6>Hike End</H6>
            {this.timePickerFor('hikeEnd')}
          </Column>
          <Column>
            <H6>Dropoff Start</H6>
            {this.timePickerFor('dropoffStart')}
            <H6>Dropoff End</H6>
            {this.timePickerFor('dropoffEnd')}
          </Column>
        </GridParent>
      </div>
    );
  }
}

export default TripTimeSelector;

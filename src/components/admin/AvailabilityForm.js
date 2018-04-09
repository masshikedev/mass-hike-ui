import React, { Component } from 'react';
import DayPicker from 'react-day-picker';
import TimePicker from '../TimePicker';
import { P, H6, GridParent, Button, Label } from '../../style';
import { MONTH_DATE_YEAR, TIME } from '../../utils/dateFormats';
import styled from 'styled-components';
import moment from 'moment';
import { DAY_PICKER_DATE_CORRECTION } from '../../constants';

const DateColumn = styled.div`
  grid-column: span 6;
`;

const TimeColumn = styled.div`
  padding-top: 20px;
  grid-column: span 6;
`;

const AvailabilityColumn = styled.div`
  grid-column: span 8;
`;

const DeleteColumn = styled.div`
  grid-column: span 4;
  text-align: left;
  cursor: pointer;
`;

const TimeEntryForm = styled.div`
  margin-top: 20px;
`;

class AvailabilityForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedDay: null,
      selectedStartTime: null,
      selectedEndTime: null,
      availability: [],
      error: '',
    };
  }

  availableDays() {
    return this.state.availability.map(
      dayData => new Date(dayData.date + DAY_PICKER_DATE_CORRECTION)
    );
  }

  onDayClick = day => {
    this.setState({ selectedDay: day });
  };

  getCurrentDayData() {
    const { availability, selectedDay } = this.state;
    for (let i = 0; i < availability.length; i++) {
      if (
        availability[i].date ===
        selectedDay.getTime() - DAY_PICKER_DATE_CORRECTION
      ) {
        return availability[i];
      }
    }
    return null;
  }

  newCurrentDayData = () => {
    return {
      date: this.state.selectedDay.getTime() - DAY_PICKER_DATE_CORRECTION,
      times: [],
    };
  };

  addTimesToDay(day, startTime, endTime) {
    const { times } = day;
    let overlap = false;
    for (let i = 0; i < times.length; i++) {
      if (endTime > times[i].end && startTime < times[i].end) {
        overlap = true;
        times[i].end = endTime;
      }
      if (startTime < times[i].start && endTime > times[i].start) {
        overlap = true;
        times[i].start = startTime;
      }
      if (startTime > times[i].start && endTime < times[i].end) {
        overlap = true;
      }
    }
    if (!overlap) {
      day.times.push({
        start: startTime,
        end: endTime,
      });
    }
  }

  onAddAvailibility = e => {
    e.preventDefault();
    const {
      selectedDay,
      selectedStartTime,
      selectedEndTime,
      availability,
    } = this.state;
    const { onChange } = this.props;
    if (selectedStartTime.unix() > selectedEndTime.unix()) {
      return this.setState({
        error: 'Start time must be earlier than end time',
      });
    }
    const isNewDay = !this.getCurrentDayData();
    const currentDayData = this.getCurrentDayData() || this.newCurrentDayData();
    this.addTimesToDay(
      currentDayData,
      selectedStartTime.utc().unix() * 1000,
      selectedEndTime.utc().unix() * 1000
    );
    const newAvailability = isNewDay
      ? availability.concat([currentDayData])
      : availability;
    this.setState(
      {
        availability: newAvailability,
        selectedStartTime: null,
        selectedEndTime: null,
        error: '',
      },
      () => onChange(this.state.availability)
    );
  };

  renderAvailibilityForDay = () => {
    const { availability, selectedDay } = this.state;
    const { onChange } = this.props;
    let dayData = this.getCurrentDayData();
    if (!dayData || dayData.times.length === 0) {
      return <P>Unavailable</P>;
    }
    return dayData.times.map((range, i) => {
      return (
        <GridParent key={i}>
          <AvailabilityColumn>
            <P>
              {`${moment.utc(range.start).format(TIME)}-${moment
                .utc(range.end)
                .format(TIME)}`}
            </P>
          </AvailabilityColumn>
          <DeleteColumn
            onClick={() => {
              dayData.times.splice(i, 1);
              this.setState({ availability }, () =>
                onChange(this.state.availability)
              );
            }}
          >
            X
          </DeleteColumn>
        </GridParent>
      );
    });
  };

  renderTimeEntryForm = () => {
    const { selectedStartTime, selectedEndTime, error } = this.state;
    return (
      <TimeEntryForm>
        <Label>
          Start:{' '}
          <TimePicker
            value={selectedStartTime}
            onChange={time => this.setState({ selectedStartTime: time })}
          />
        </Label>
        <Label>
          End:{' '}
          <TimePicker
            value={selectedEndTime}
            onChange={time => this.setState({ selectedEndTime: time })}
          />
        </Label>
        {error && <P error>{error}</P>}
        <Button onClick={this.onAddAvailibility}>Add Availability</Button>
      </TimeEntryForm>
    );
  };

  render() {
    const { selectedDay, error } = this.state;
    return (
      <GridParent>
        <DateColumn>
          <DayPicker
            onDayClick={this.onDayClick}
            selectedDays={[selectedDay]}
            modifiers={{ highlighted: this.availableDays() }}
          />
        </DateColumn>
        {selectedDay && (
          <TimeColumn>
            <H6>{moment(selectedDay).format(MONTH_DATE_YEAR)}</H6>
            {this.renderAvailibilityForDay()}
            {this.renderTimeEntryForm()}
          </TimeColumn>
        )}
      </GridParent>
    );
  }
}

export default AvailabilityForm;

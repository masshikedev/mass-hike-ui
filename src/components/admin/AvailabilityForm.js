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
  text-align: right;
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

  onAddAvailibility = e => {
    e.preventDefault();
    const {
      selectedDay,
      selectedStartTime,
      selectedEndTime,
      availability,
    } = this.state;
    const { onChange } = this.props;
    const isNewDay = !this.getCurrentDayData();
    const currentDayData = this.getCurrentDayData() || this.newCurrentDayData();
    currentDayData.times.push({
      start: selectedStartTime.utc().unix() * 1000,
      end: selectedEndTime.utc().unix() * 1000,
    });
    if (isNewDay) {
      this.setState(
        { availability: availability.concat([currentDayData]) },
        () => onChange(this.state.availability)
      );
    } else {
      this.setState({ availability }, () => onChange(this.state));
    }
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
    const { selectedStartTime, selectedEndTime } = this.state;
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
        <Button onClick={this.onAddAvailibility}>Add Availability</Button>
      </TimeEntryForm>
    );
  };

  render() {
    const { selectedDay } = this.state;
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

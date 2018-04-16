import React from 'react';
import RcTimePicker from 'rc-time-picker';
import moment from 'moment';

export default function TimePicker(props) {
  return (
    <RcTimePicker
      {...props}
      showSecond={false}
      use12Hours
      minuteStep={15}
      defaultOpenValue={moment.unix(0).utc()}
    />
  );
}

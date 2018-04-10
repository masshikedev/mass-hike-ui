import React from 'react';
import TimePicker from 'rc-time-picker';
import moment from 'moment';

export default function TimePicker(props) {
  return (
    <TimePicker
      {...props}
      showSecond={false}
      use12Hours
      minuteStep={15}
      defaultOpenValue={moment.unix(0).utc()}
    />
  );
}

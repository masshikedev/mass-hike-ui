const Calendar = {
  months: [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ],

  days: [
    'Sunday',
    'Monday',
    'Tuesday',
    'Wednesday',
    'Thursday',
    'Friday',
    'Saturday',
  ],
  getOrdinal: n => {
    let s = ['th', 'st', 'nd', 'rd'],
      v = n % 100;
    return n + (s[(v - 20) % 10] || s[v] || s[0]);
  },
  dateString: date => {
    //const day = Calendar.days[date.getDay()];
    const month = Calendar.months[date.getMonth()];
    return (
      month +
      ' ' +
      Calendar.getOrdinal(date.getDate()) +
      ', ' +
      date.getFullYear()
    );
  },
};

export default Calendar;

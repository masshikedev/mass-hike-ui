export const getDate = dateTime => {
  const date = new Date(dateTime * 1000);
  const locale = 'en-us';
  const month = date.toLocaleString(locale, { month: 'long' });
  return `${month} ${date.getDate()}, ${date.getFullYear()}`;
};

export const getTime = dateTime => {
  const time = new Date(dateTime * 1000);
  const locale = 'en-US';
  const options = {
    hour: '2-digit',
    minute: '2-digit',
    hour12: true,
  };
  return time.toLocaleTimeString(locale, options);
};

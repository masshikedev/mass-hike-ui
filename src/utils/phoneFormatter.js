// Formats a phone number to match this regex:
// /[(]\d{3}[)] \d{3} [-] \d{4}/

const formatPhoneNumber = input => {
  // Strip all characters from the input except digits
  input = input.replace(/\D/g, '').substring(0, 10);

  // Based upon the length of the string, we add formatting as necessary
  let size = input.length;
  if (!size) {
    return input;
  } else if (size < 4) {
    input = '(' + input;
  } else if (size < 7) {
    input = '(' + input.substring(0, 3) + ') ' + input.substring(3, 6);
  } else {
    input =
      '(' +
      input.substring(0, 3) +
      ') ' +
      input.substring(3, 6) +
      ' - ' +
      input.substring(6, 10);
  }
  return input;
};

export default formatPhoneNumber;

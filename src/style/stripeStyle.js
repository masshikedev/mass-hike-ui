import constants from './constants';

const stripeStyle = {
  base: {
    color: 'black',
    fontSize: '16px',
    fontWeight: '400',
    fontSmoothing: 'antialiased',
  },
  empty: {
    textTransform: 'uppercase',
    fontSize: '16px',
    fontWeight: '600',
    color: `${constants.darkgray}`,
  },
  invalid: {
    color: `${constants.red}`,
    ':focus': {
      color: 'black',
    },
  },
};

export default stripeStyle;

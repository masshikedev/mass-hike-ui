import styled from 'styled-components';
import { constants } from './';

const getBgColor = props => {
  if (props.disabled) {
    return '#999999';
  }
  if (props.color) {
    switch (props.color) {
      case 'yellow':
        return constants.yellow;
      case 'lightyellow':
        return constants.lightyellow;
      case 'orange':
        return constants.orange;
      case 'blue':
        return constants.blue;
      case 'red':
        return constants.red;
      case 'transparent':
        return 'transparent';
      default:
        return constants.yellow;
    }
  }
  if (props.primary) {
    return constants.orange;
  }
  return constants.yellow;
};

const getHoverColor = props => {
  if (props.disabled) {
    return '#999999';
  }
  if (props.color) {
    switch (props.color) {
      case 'yellow':
        return constants.yellowHover;
      case 'lightyellow':
        return constants.lightyellow;
      case 'orange':
        return constants.orangeHover;
      case 'blue':
        return constants.blueHover;
      case 'red':
        return constants.redHover;
      case 'transparent':
        return 'transparent';
      default:
        return constants.yellowHover;
    }
  }
  if (props.primary) {
    return constants.orangeHover;
  }
  return constants.yellowHover;
};

const Button = styled.button`
  width: ${({ small }) => (small ? '40px' : 'auto')};
  height: ${({ small }) => (small ? '20px' : 'auto')};
  max-width: 300px;
  min-height: ${({ primary, small }) =>
    primary ? '56px' : small ? '20px' : '36px'};
  background-color: ${getBgColor};
  border: ${props =>
    props.color === 'transparent' ? '3px solid #fff' : 'none'};
  border-radius: ${props => (props.primary ? '40px' : '30px')};
  font-family: 'proxima-nova';
  font-size: ${({ primary, small }) =>
    primary ? '21px' : small ? '12px' : '18px'};
  font-weight: ${props =>
    props.primary || props.color === 'transparent' ? 700 : 500};
  font-style: normal;
  font-stretch: normal;
  line-height: normal;
  letter-spacing: ${props => (props.primary ? '1px' : '0.3px')};
  text-align: center;
  align-items: center;
  color: white;
  text-decoration: none;
  margin-bottom: 10px;
  margin-left: ${({ small }) => (small ? '15px' : 'auto')};
  padding: ${({ primary, small, color }) =>
    primary
      ? '20px 35px'
      : small ? '0px' : color === 'transparent' ? '15px 20px' : '5px 20px'};
  > * {
    margin: 0;
    padding: 0;
    color: white;
  }
  cursor: ${({ disabled, color }) =>
    disabled || color === 'lightyellow' ? 'default' : 'pointer'};
  text-transform: ${props =>
    props.primary || props.color === 'transparent' ? 'uppercase' : 'auto'};

  &:hover {
    background-color: ${getHoverColor};
  }

  &:focus {
    outline: none;
  }
`;

export default Button;

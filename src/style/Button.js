import styled from 'styled-components';
import { constants } from './';

function getBgColor(props) {
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
      default:
        return constants.yellow;
    }
  }
  if (props.primary) {
    return constants.orange;
  }
  return constants.yellow;
}

const Button = styled.button`
  width: ${({ small }) => (small ? '40px' : 'auto')};
  height: ${({ small }) => (small ? '20px' : 'auto')};
  max-width: 300px;
  min-height: ${({ primary, small }) =>
    primary ? '56px' : small ? '20px' : '36px'};
  background-color: ${getBgColor};
  border: none;
  border-radius: 30px;
  font-family: 'proxima-nova';
  font-size: ${({ primary, small }) =>
    primary ? '21px' : small ? '12px' : '18px'};
  font-weight: 500;
  font-style: normal;
  font-stretch: normal;
  line-height: normal;
  letter-spacing: 0.3px;
  text-align: center;
  align-items: center;
  color: white;
  text-decoration: none;
  margin-bottom: 10px;
  margin-left: ${({ small }) => (small ? '15px' : 'auto')};
  padding: ${({ primary, small }) =>
    primary ? '15px 30px' : small ? '0px' : '5px 20px'};
  > * {
    margin: 0;
    padding: 0;
    color: white;
  }
  cursor: ${({ active, small }) => (active || small ? 'pointer' : 'default')};
`;

export default Button;

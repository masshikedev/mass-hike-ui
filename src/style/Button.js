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
      case 'orange':
        return constants.orange;
      case 'blue':
        return constants.blue;
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
  max-width: 300px;
  min-height: ${({ primary }) => (primary ? '56px' : '36px')};
  background-color: ${getBgColor};
  border: none;
  border-radius: 30px;
  font-family: 'proxima-nova';
  font-size: ${({ primary }) => (primary ? '21px' : '18px')};
  font-weight: normal;
  font-style: normal;
  font-stretch: normal;
  line-height: normal;
  letter-spacing: 0.3px;
  text-align: center;
  align-items: center;
  color: white;
  text-decoration: none;
  margin-bottom: 10px;
  padding: ${({ primary }) => (primary ? '15px 30px' : '5px 20px')};
  > * {
    margin: 0;
    padding: 0;
    color: white;
  }
`;

export default Button;

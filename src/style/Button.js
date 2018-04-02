import styled from 'styled-components';
import { constants } from './';

const Button = styled.button`
  width: 100%;
  max-width: 300px;
  height: ${({ small }) => (small ? '36px' : '56px')};
  background-color: ${({ primary, disabled, trip }) =>
    disabled
      ? '#999999'
      : primary ? constants.yellow : trip ? constants.blue : constants.orange};
  text-transform: ${({ primary }) => (primary ? 'lowercase' : 'none')};
  padding: ${({ primary }) => (primary ? '0 20px' : 'auto')};
  border: none;
  border-radius: 31.5px;
  font-family: 'proxima-nova';
  font-size: ${({ small }) => (small ? '18px' : '21px')};
  font-weight: normal;
  font-style: normal;
  font-stretch: normal;
  line-height: normal;
  letter-spacing: 0.3px;
  text-align: center;
  align-items: center;
  color: white;
  text-decoration: none;
  > * {
    margin: 0;
  }
`;

export default Button;

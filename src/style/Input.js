import styled from 'styled-components';
import constants from './constants';

const Input = styled.input`
  box-sizing: border-box;
  font-size: 14px;
  text-transform: uppercase;
  font-weight: 600;
  line-height: 2;
  color: ${constants.darkgray};
  padding: 5px 10px;
  &[type='text'] {
    width: 100%;
    border-radius: 4px;
    background-color: #ffffff;
    border: solid 2px ${props => (props.invalid ? 'red' : 'black')};
  }
  &[type='password'] {
    width: 100%;
    max-width: 500px;
    border: 3px solid ${props => (props.invalid ? 'red' : 'black')};
  }
`;

export default Input;

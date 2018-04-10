import styled from 'styled-components';
import constants from './constants';

const Input = styled.input`
  box-sizing: border-box;
  font-size: 14px;

  font-weight: 600;
  line-height: 2;
  color: black;
  padding: 5px 10px;
  &[type='text'] {
    width: 100%;
    border-radius: 4px;
    background-color: #ffffff;
    border: solid 2px ${props => (props.invalid ? constants.red : 'black')};
    max-width: ${props =>
      props.short ? '125px' : props.medium ? '250px' : '500px'};
    margin-right: ${props => (props.short ? '15px' : '0px')};
  }
  &[type='password'] {
    width: 100%;
    max-width: 500px;
    border: 3px solid ${props => (props.invalid ? 'red' : 'black')};
  }
  :placeholder-shown {
    text-transform: uppercase;
    color: ${constants.darkgray};
  }
`;

export default Input;

import styled from 'styled-components';

const Input = styled.input`
  margin-bottom: 10px;
  box-sizing: border-box;
  font-size: 20px;
  padding: 5px;
  &[type='text'] {
    width: 100%;
    max-width: 500px;
    border: 3px solid ${props => (props.invalid ? 'red' : 'black')};
  }
`;

export default Input;

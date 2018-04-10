import styled from 'styled-components';

const TextArea = styled.textarea`
  margin-bottom: 10px;
  box-sizing: border-box;
  font-size: 14px;
  padding: 5px;
  width: 100%;
  height: 300px;
  max-width: 400px;
  resize: none;
  border: 3px solid ${props => (props.invalid ? 'red' : 'black')};
`;

export default TextArea;

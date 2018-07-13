import styled from 'styled-components';

const TextArea = styled.textarea`
  margin-bottom: 10px;
  box-sizing: border-box;
  font-size: 14px;
  padding: 5px;
  width: 100%;
  height: 300px;
  max-width: 500px;
  border-radius: 4px;
  resize: none;
  border: 2px solid ${props => (props.invalid ? 'red' : 'black')};
`;

export default TextArea;

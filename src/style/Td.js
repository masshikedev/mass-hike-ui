import styled from 'styled-components';

const Td = styled.td`
  padding: 10px 10px 10px 0;
  font-size: 16px;
  text-align: ${props => (props.alignRight ? 'right' : 'left')};
  & > a {
    text-decoration: underline;
  }
`;

export default Td;

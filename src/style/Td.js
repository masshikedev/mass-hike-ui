import styled from 'styled-components';

const Td = styled.td`
  padding: 10px 0;
  font-size: 16px;
  text-align: ${props => (props.alignRight ? 'right' : 'left')};
`;

export default Td;

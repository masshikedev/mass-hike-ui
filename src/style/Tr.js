import styled from 'styled-components';

const Tr = styled.tr`
  font-weight: ${props => (props.totals ? 700 : 400)};
`;

export default Tr;

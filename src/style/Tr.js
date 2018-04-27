import styled from 'styled-components';

const Tr = styled.tr`
  font-weight: ${props => (props.totals ? 700 : 400)};
  font-family: ${props => (props.totals ? 'proxima-nova' : 'inherit')};
`;

export default Tr;

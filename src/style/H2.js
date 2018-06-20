import styled from 'styled-components';
import MediaQueries from './MediaQueries';

const H2 = styled.h2`
  font-size: 40px;
  font-weight: bold;
  color: ${props => (props.color === 'white' ? 'white' : 'inherit')};
  margin-bottom: 15px;
  font-family: ${({ proxima }) =>
    proxima ? 'proxima-nova' : 'Source Serif Pro'};
`;

export default H2;

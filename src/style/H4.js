import styled from 'styled-components';
import MediaQueries from './MediaQueries';

const H4 = styled.h4`
  font-family: 'proxima-nova';
  font-size: 36px;
  font-weight: 700;

  ${MediaQueries.small} {
    font-size: 26px;
  }
`;

export default H4;

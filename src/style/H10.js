import styled from 'styled-components';
import MediaQueries from './MediaQueries';

const H10 = styled.p`
  font-family: 'proxima-nova';
  font-size: 18px;
  font-weight: 400;

  ${MediaQueries.small} {
    font-size: 16px;
  }
`;

export default H10;

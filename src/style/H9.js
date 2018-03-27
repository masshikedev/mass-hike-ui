import styled from 'styled-components';
import MediaQueries from './MediaQueries';

const H9 = styled.p`
  font-family: 'proxima-nova';
  font-size: 18px;
  font-weight: 700;

  ${MediaQueries.small} {
    font-size: 16px;
  }
`;

export default H9;

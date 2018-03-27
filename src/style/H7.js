import styled from 'styled-components';
import MediaQueries from './MediaQueries';

const H7 = styled.p`
  font-family: 'proxima-nova';
  font-size: 24px;
  font-weight: 400;

  ${MediaQueries.small} {
    font-size: 20px;
  }
`;

export default H7;

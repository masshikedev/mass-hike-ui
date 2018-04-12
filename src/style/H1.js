import styled from 'styled-components';
import MediaQueries from './MediaQueries';

const H1 = styled.h1`
  font-weight: bold;
  margin-bottom: 50px;
  font-size: 72px;

  ${MediaQueries.small} {
    font-size: 48px;
  }
`;

export default H1;

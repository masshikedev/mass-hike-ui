import styled from 'styled-components';
import MediaQueries from './MediaQueries';

const H1 = styled.h1`
  font-weight: bold;
  margin-bottom: 50px;
  font-size: 72px;
  font-weight: bold;
  color: #000;

  ${MediaQueries.small} {
    font-size: 50px;
  }
`;

export default H1;

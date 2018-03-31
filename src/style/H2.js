import styled from 'styled-components';
import MediaQueries from './MediaQueries';

const H2 = styled.h2`
  font-size: 40px;
  font-weight: bold;
  margin-bottom: 15px;

  ${MediaQueries.small} {
    font-size: 36px;
  }
`;

export default H2;

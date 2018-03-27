import styled from 'styled-components';
import MediaQueries from './MediaQueries';

const H3 = styled.h3`
  font-size: 42px;
  margin-bottom: 10px;

  ${MediaQueries.small} {
    font-size: 26px;
  }
`;

export default H3;

import styled from 'styled-components';
import MediaQueries from './MediaQueries';

const H6 = styled.h6`
  font-size: 26px;

  ${MediaQueries.small} {
    font-size: 20px;
  }
`;
export default H6;

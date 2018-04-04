import styled from 'styled-components';
import MediaQueries from './MediaQueries';

const H5 = styled.h5`
  font-size: 28px;
  font-family: 'proxima-nova';
  font-weight: 300;

  ${MediaQueries.small} {
    font-size: 22px;
    color: #558959;
  }
`;

export default H5;

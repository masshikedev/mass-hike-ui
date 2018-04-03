import styled from 'styled-components';
import MediaQueries from './MediaQueries';

const H6 = styled.h6`
  margin-bottom: 5px;
  font-size: 18px;
  font-weight: bold;
  font-family: 'proxima-soft';
  color: ${({ color }) => (color ? color : 'black')};

  ${MediaQueries.small} {
    font-size: 20px;
  }
`;
export default H6;

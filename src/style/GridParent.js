import styled from 'styled-components';
import MediaQueries from './MediaQueries';

const GridParent = styled.div`
  display: grid;
  grid-template-columns: repeat(12, 1fr);
  grid-column-gap: 15px;
  ${MediaQueries.small} {
    grid-column-gap: 0;
  }
`;

export default GridParent;

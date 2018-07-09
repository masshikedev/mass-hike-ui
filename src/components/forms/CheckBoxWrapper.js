import styled from 'styled-components';
import { MediaQueries } from '../../style';

const CheckBoxWrapper = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  align-items: center;
  padding: 5px;
  ${MediaQueries.small} {
    justify-content: space-between;
  }
`;

export default CheckBoxWrapper;

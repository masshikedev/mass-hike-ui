import styled from 'styled-components';
import { MediaQueries } from '../../style';

const CheckBoxWrapper = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  align-items: center;
  padding: 5px 0;
  ${MediaQueries.small} {
    justify-content: space-between;
    margin-bottom: 15px;
  }
`;

export default CheckBoxWrapper;

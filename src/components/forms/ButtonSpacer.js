import styled from 'styled-components';
import { MediaQueries } from '../../style';

const ButtonSpacer = styled.div`
  display: flex;
  flex-flow: row wrap;

  ${MediaQueries.small} {
    margin-top: 20px;
  }
`;

export default ButtonSpacer;

import styled from 'styled-components';
import constants from './constants';

const A = styled.a`
  font-size: 18px;
  color: ${({ color }) => (color ? color : constants.green)};
  text-decoration: none;
`;

export default A;

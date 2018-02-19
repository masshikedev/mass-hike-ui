import styled from 'styled-components';

const H2 = styled.h2`
  font-size: ${({ large, small }) =>
    large ? '48px' : small ? '24px' : '36px'};
  font-weight: bold;
  margin-bottom: 15px;
`;

export default H2;

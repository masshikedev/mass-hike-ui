import styled from 'styled-components';

const P = styled.p`
  font-size: ${({ large, small }) =>
    large ? '20px' : small ? '14px' : '16px'};
  margin-bottom: 10px;
`;

export default P;

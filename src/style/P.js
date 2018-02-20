import styled from 'styled-components';

const P = styled.p`
  font-size: ${({ large, small }) =>
    large ? '20px' : small ? '14px' : '16px'};

  text-transform: ${({ capitalize, uppercase }) =>
    capitalize ? 'capitalize' : uppercase ? 'uppercase' : 'none'};

  margin-bottom: 10px;
  line-height: 1.44;
`;

export default P;

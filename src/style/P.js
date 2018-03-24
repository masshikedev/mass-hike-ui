import styled from 'styled-components';

const P = styled.p`
  font-size: ${({ large, small }) =>
    large ? '20px' : small ? '14px' : '16px'};

  text-transform: ${({ capitalize }) => (capitalize ? 'capitalize' : 'none')};

  font-family: 'Open Sans', sans-serif;
  margin-bottom: 10px;
  line-height: 1.44;
  color: ${({ error }) => (error ? 'red' : 'inherit')};
`;

export default P;

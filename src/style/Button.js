import styled from 'styled-components';

const Button = styled.button`
  width: 100%;
  max-width: 300px;
  height: ${({ small }) => (small ? '40px' : '56px')};
  background-color: #000000;
  font-family: 'Open Sans';
  font-size: ${({ small }) => (small ? '18px' : '21px')};
  font-weight: normal;
  font-style: normal;
  font-stretch: normal;
  line-height: normal;
  letter-spacing: 0.3px;
  text-align: center;
  color: #ffffff;
`;

export default Button;

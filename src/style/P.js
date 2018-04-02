import styled from 'styled-components';
import constants from './constants';

const P = styled.p`
  font-size: ${({ xxlarge, xlarge, large, small }) =>
    xxlarge
      ? '42px'
      : xlarge ? '24px' : large ? '18px' : small ? '14px' : '16px'};

  text-transform: ${({ capitalize, uppercase, lowercase }) =>
    capitalize
      ? 'capitalize'
      : uppercase ? 'uppercase' : lowercase ? 'lowercase' : 'none'};

  font-family: ${({ proxima }) => (proxima ? 'proxima-nova' : 'Source Serif')},
    'inherit';

  font-weight: ${({ medium, bold, extrabold }) =>
    medium ? '500' : bold ? '700' : extrabold ? '800' : '400'};
  margin-bottom: 10px;
  line-height: 1.44;
  color: ${({ error, green, orange, yellow, white }) =>
    error
      ? 'red'
      : green
        ? constants.green
        : orange
          ? constants.orange
          : yellow ? constants.yellow : white ? '#fff' : 'inherit'};
`;

export default P;

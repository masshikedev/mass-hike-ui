import styled from 'styled-components';
import constants from './constants';

const P = styled.p`
  font-size: ${({ size }) =>
    size === 'xlarge'
      ? '42px'
      : size === 'large'
        ? '24px'
        : size === 'medium' ? '16px' : size === 'small' ? '14px' : '16px'};

  text-transform: ${({ capitalize, uppercase, lowercase }) =>
    capitalize
      ? 'capitalize'
      : uppercase ? 'uppercase' : lowercase ? 'lowercase' : 'none'};

  font-family: ${({ proxima }) => (proxima ? 'proxima-nova' : 'inherit')};

  font-weight: ${({ medium, bold, extrabold }) =>
    medium ? '500' : bold ? '700' : extrabold ? '800' : '400'};
  margin-bottom: 10px;
  line-height: 1.44;
  color: ${({ color }) =>
    color === 'error'
      ? constants.red
      : color === 'green'
        ? constants.green
        : color === 'yellow'
          ? constants.yellow
          : color === 'orange'
            ? constants.orange
            : color === 'white' ? '#fff' : 'black'};
`;

export default P;

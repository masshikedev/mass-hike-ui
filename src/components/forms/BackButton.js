import React from 'react';
import { Button } from '../../style';
import styled from 'styled-components';

const Wrapper = Button.extend`
  margin: 0px 15px;
`;

const Arrow = styled.img`
  margin-left: 5px;
  margin-right: 10px;
  height: 10px;
  width: auto;
  transform: rotate(-90deg);
`;

const Title = styled.span`
  font-size: 16px;
  font-family: 'proxima-nova', 'inherit';
  font-weight: 700;
  color: white;
  margin-right: 8px;
`;

const BackButton = props => {
  const { onClick, active } = props;
  return (
    <Wrapper
      onClick={active ? onClick : e => e.preventDefault()}
      color={active ? 'yellow' : 'lightyellow'}
      active={active}
    >
      <Arrow src={require('../../images/white-arrow.png')} />
      <Title>back</Title>
    </Wrapper>
  );
};

export default BackButton;

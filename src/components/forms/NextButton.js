import React from 'react';
import { Button } from '../../style';
import styled from 'styled-components';

const Wrapper = Button.extend`
  margin: 0;
`;

const Arrow = styled.img`
  margin-left: 10px;
  margin-right: 5px;
  height: 10px;
  width: auto;
  transform: rotate(90deg);
`;

const Title = styled.span`
  font-size: 16px;
  font-family: 'proxima-nova', 'inherit';
  font-weight: 700;
  color: white;
  margin-left: 8px;
`;

const NextButton = props => {
  const { onClick, active } = props;
  return (
    <Wrapper
      onClick={active ? onClick : e => e.preventDefault()}
      color={active ? 'yellow' : 'lightyellow'}
      active={active}
    >
      <Title>next</Title>
      <Arrow src={require('../../images/white-arrow.png')} />
    </Wrapper>
  );
};

export default NextButton;

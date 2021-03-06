import React from 'react';
import { Button, MediaQueries } from '../../style';
import styled from 'styled-components';

const Wrapper = Button.extend`
  margin: 0px 30px 0px 0px;
  ${MediaQueries.small} {
    display: none;
  }
`;

const Arrow = styled.img`
  margin-left: 5px;
  margin-right: 10px;
  margin-bottom: -3px;
  height: auto;
  width: 9px;
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
      <Arrow src={require('../../images/white-arrow-left.png')} />
      <Title>back</Title>
    </Wrapper>
  );
};

export default BackButton;

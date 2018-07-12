import React from 'react';
import { Button, MediaQueries } from '../../style';
import styled from 'styled-components';

const Wrapper = Button.extend`
  margin: 0;
  ${MediaQueries.small} {
    display: ${props => (props.hideOnMobile ? 'none' : 'inline-block')};
  }
`;

const Arrow = styled.img`
  margin-left: 10px;
  margin-right: 5px;
  margin-bottom: -3px;
  height: auto;
  width: 9px;
`;

const Title = styled.span`
  font-size: 16px;
  font-family: 'proxima-nova', 'inherit';
  font-weight: 700;
  color: white;
  margin-left: 8px;
`;

const NextButton = props => {
  const { onClick, active, hideOnMobile } = props;
  return (
    <Wrapper
      onClick={active ? onClick : e => e.preventDefault()}
      color={active ? 'yellow' : 'lightyellow'}
      active={active}
      hideOnMobile={hideOnMobile}
    >
      <Title>next</Title>
      <Arrow src={require('../../images/white-arrow-right.png')} />
    </Wrapper>
  );
};

export default NextButton;

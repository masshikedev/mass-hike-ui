import React from 'react';
import styled from 'styled-components';
import { Checkbox, ValidatedTextInput } from './index';

const OtherWrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
`;

function CustomPrice(props) {
  const { prices, selectedPrice, onChange, onBlur, error } = props;
  return (
    <OtherWrapper>
      <Checkbox
        type="radio"
        checked={!prices.includes(selectedPrice)}
        onChange={() => {
          document.getElementById('customPrice').focus();
          document.getElementById('customPrice').select();
        }}
        text="Other:"
      />
      <ValidatedTextInput
        type="number"
        id="customPrice"
        placeholder="Amount"
        value={!prices.includes(selectedPrice) ? selectedPrice : ''}
        onChange={onChange}
        onFocus={onChange}
        onBlur={onBlur}
        highlight={error}
        short
        smallBottomMargin
      />
    </OtherWrapper>
  );
}

export default CustomPrice;

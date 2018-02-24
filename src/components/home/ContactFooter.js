import React from 'react';
import styled from 'styled-components';
import { H3, H6, Input, P } from '../../style';

const Contact = styled.div`
  display: flex;
`;

function ContactFooter(props) {
  return (
    <Contact>
      <div>
        <label>
          <Input
            type="text"
            value="Name"
            onChange={e => this.setState({ cardNumber: e.target.value })}
          />
        </label>
        <label>
          <Input
            type="text"
            value="Email"
            onChange={e => this.setState({ cardNumber: e.target.value })}
          />
        </label>
      </div>
      <div>
        <P>Home</P>
        <P>About</P>
        <P>Contact Us</P>
        <P>Impact</P>
      </div>
    </Contact>
  );
}

export default ContactFooter;

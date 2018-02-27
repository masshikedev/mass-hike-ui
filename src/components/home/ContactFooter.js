import React from 'react';
import styled from 'styled-components';
import { H3, H6, Input, P, Button, Img, MediaQueries } from '../../style';

const Contact = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-template-rows: repeat(3, 1fr);
  grid-column-gap: 20px;
  ${MediaQueries.small} {
    grid-template-columns: 1fr;
  }
`;

const Wrapper = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-gap: 20px;

  ${MediaQueries.small} {
    grid-template-columns: 1fr;
  }
`;

const Links = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
`;

const Social = styled.div`
  display: grid;
  grid-column: span 2;
  grid-template-columns: repeat(4, 1fr);
  grid-column-gap: 20px;
`;

const Logo = styled.div`
  grid-row: span 3;
`;

function ContactFooter(props) {
  return (
    <Wrapper>
      <Contact>
        <Logo>
          <Img src={props.doc.data.about_image.url} />
        </Logo>
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
        <Button>Send me emails!</Button>
      </Contact>
      <Links>
        <div>
          <P>Home</P>
          <P>About</P>
          <P>Contact Us</P>
          <P>Impact</P>
        </div>
        <div>
          <P>Book a trip</P>
          <P>Previous trips</P>
          <P>Prepare for your hike</P>
          <P>FAQs</P>
        </div>
        <Social>
          <Img src={props.doc.data.about_image.url} />
          <Img src={props.doc.data.about_image.url} />
          <Img src={props.doc.data.about_image.url} />
          <Img src={props.doc.data.about_image.url} />
        </Social>
      </Links>
    </Wrapper>
  );
}

export default ContactFooter;

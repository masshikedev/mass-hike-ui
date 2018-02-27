import React from 'react';
import styled from 'styled-components';
import {
  H3,
  H6,
  Input,
  P,
  Button,
  Img,
  MediaQueries,
  GridParent,
} from '../../style';

const Contact = styled.div`
  grid-column: span 4;
  ${MediaQueries.small} {
    grid-column: span 12;
  }
`;

const Links = styled.div`
  display: grid;
  grid-column: 9 / span 4;
  grid-template-columns: 1fr 1fr;

  ${MediaQueries.small} {
    grid-column: span 12;
  }
`;

const Social = styled.div`
  display: grid;
  grid-column: span 2;
  grid-template-columns: repeat(4, 1fr);
  grid-column-gap: 20px;
`;

const Logo = styled.div`
  grid-column: span 3;

  ${MediaQueries.small} {
    grid-column: span 12;
  }
`;

function ContactFooter(props) {
  return (
    <GridParent>
      <Logo>
        <Img src={props.doc.data.about_image.url} />
      </Logo>
      <Contact>
        <label>
          <Input
            type="text"
            value="Name"
            onChange={e => this.setState({ Name: e.target.value })}
          />
        </label>
        <label>
          <Input
            type="text"
            value="Email"
            onChange={e => this.setState({ Email: e.target.value })}
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
    </GridParent>
  );
}

export default ContactFooter;

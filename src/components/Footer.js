import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import PrismicPage from '../prismic/PrismicPage';
import { RichText } from 'prismic-reactjs';
import hamburger from '../images/hamburger.png';
import {
  Container,
  Input,
  P,
  Button,
  Img,
  MediaQueries,
  GridParent,
} from '../style';

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

class Footer extends Component {
  static pageType = 'footer';

  render() {
    return (
      <Container>
        <GridParent>
          <Logo>
            <Img src={this.props.doc.data.footer_image.url} />
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
            <Button>
              {RichText.asText(this.props.doc.data.submit_button)}
            </Button>
          </Contact>
          <Links>
            {this.renderFooterLinks()}
            <Social>{this.renderSocialLinks()}</Social>
          </Links>
        </GridParent>
      </Container>
    );
  }

  renderFooterLinks() {
    const body = this.props.doc.data.body;
    const footerLinks = body.map(link => {
      if (link.slice_type === 'footer_link') {
        if (link.primary.destination.uid) {
          const destination = '/' + link.primary.destination.uid;
          return (
            <P>
              <Link to={destination}>
                {RichText.asText(link.primary.label)}
              </Link>
            </P>
          );
        } else {
          return (
            <P>
              <a href={link.primary.destination.url}>
                {RichText.asText(link.primary.label)}
              </a>
            </P>
          );
        }
      }
    });
    return footerLinks;
  }

  renderSocialLinks() {
    const body = this.props.doc.data.body;
    const socialLinks = body.map(link => {
      if (link.slice_type === 'social_media_link') {
        if (link.primary.destination.uid) {
          const destination = '/' + link.primary.destination.uid;
          return (
            <Link to={destination}>
              <Img src={link.primary.label.url} />
            </Link>
          );
        } else {
          return (
            <a href={link.primary.destination.url}>
              <Img src={link.primary.label.url} />
            </a>
          );
        }
      }
    });
    return socialLinks;
  }
}

export default PrismicPage(Footer);

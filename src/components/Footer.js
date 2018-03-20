import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import PrismicPage from '../prismic/PrismicPage';
import { RichText } from 'prismic-reactjs';
import hamburger from '../images/hamburger.png';
import renderLinkSlices from '../utils/renderLinkSlices';
import SocialMedia from './footer/SocialMedia';
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
            {renderLinkSlices(this.props.doc.data.body)}
            <SocialMedia url={this.props.doc.data.footer_image.url} />
          </Links>
        </GridParent>
      </Container>
    );
  }
}

export default PrismicPage(Footer);

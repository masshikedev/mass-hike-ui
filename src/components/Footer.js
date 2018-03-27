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
  H2,
  Input,
  P,
  Button,
  Img,
  MediaQueries,
  GridParent,
} from '../style';

const Foot = Container.extend`
  color: white;
  background-color: #558959;
`;

const Contact = styled.div`
  grid-column: span 4;
  ${MediaQueries.small} {
    grid-column: span 12;
    align-items: center;
  }
`;

const SButton = Button.extend`
  color: #fff;
  background-color: #faaf3f;
  text-transform: lowercase;
  font-family: 'Open Sans';
  font-weight: normal;

  border-radius: 80px;
  padding: 0 20px;
  width: auto;
`;

const Links = styled.div`
  display: grid;
  grid-gap: 20px;
  grid-column: span 4;
  grid-template-columns: 1fr 1fr 1fr;

  ${MediaQueries.small} {
    grid-template-columns: 1fr 1fr;
    grid-column: span 12;
  }
`;

const Logo = H2.extend`
  grid-column: span 12;
  font-family: 'Open Sans';
  font-weight: normal;

  ${MediaQueries.small} {
    grid-column: span 12;
    text-align: center;
  }
`;

const FootGrid = GridParent.extend`
  padding: 40px;
`;

class Footer extends Component {
  static pageType = 'footer';

  render() {
    return (
      <Foot>
        <FootGrid>
          <Logo>Mass Hike</Logo>
          <Links>{renderLinkSlices(this.props.doc.data.body)}</Links>
          <Contact>
            <P>Sign up to receive newsletters!</P>
            <label>
              <Input
                type="text"
                value="Email"
                onChange={e => this.setState({ Email: e.target.value })}
              />
            </label>
            <SButton>
              {RichText.asText(this.props.doc.data.submit_button)}
            </SButton>
          </Contact>
        </FootGrid>
      </Foot>
    );
  }
}

export default PrismicPage(Footer);

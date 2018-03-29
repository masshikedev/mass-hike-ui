import React, { Component } from 'react';
import styled from 'styled-components';
import PrismicPage from '../prismic/PrismicPage';
import { RichText } from 'prismic-reactjs';
import renderLinkSlices from '../utils/renderLinkSlices';
import {
  Container,
  H2,
  Input,
  H5,
  Button,
  constants,
  MediaQueries,
  GridParent,
} from '../style';

const Foot = Container.extend`
  color: white;
  background-color: ${constants.green};
  padding-top: 0;
`;

const Contact = styled.div`
  grid-column: span 4;
  ${MediaQueries.small} {
    grid-column: span 12;
    align-items: center;
  }
`;

const Links = styled.ul`
  display: grid;
  grid-gap: 20px;
  grid-column: span 4;
  grid-template-columns: 1fr 1fr 1fr;
  font-family: 'proxima-nova';
  font-size: 18px;
  font-weight: 500;
  margin-left: 10px;

  ${MediaQueries.small} {
    grid-template-columns: 1fr 1fr;
    grid-column: span 12;
  }
`;

const Logo = H2.extend`
  grid-column: span 12;
  font-family: 'proxima-soft';
  font-weight: 500;
  text-transform: uppercase;

  ${MediaQueries.small} {
    grid-column: span 12;
    text-align: center;
  }
`;

const FootGrid = GridParent.extend`
  padding: 40px 80px;
`;

class Footer extends Component {
  static pageType = 'footer';

  renderFootLinks(links) {
    const footLinks = links.map(link => {
      return <li>{link}</li>;
    });
    return footLinks;
  }

  render() {
    return (
      <Foot>
        <FootGrid>
          <Logo>Mass Hike</Logo>
          <Links>
            {this.renderFootLinks(renderLinkSlices(this.props.doc.data.body))}
          </Links>
          <Contact>
            <H5>Sign up to receive newsletters!</H5>
            <label>
              <Input
                type="text"
                value="Email"
                onChange={e => this.setState({ Email: e.target.value })}
              />
            </label>
            <Button primary>
              {RichText.asText(this.props.doc.data.submit_button)}
            </Button>
          </Contact>
        </FootGrid>
      </Foot>
    );
  }
}

export default PrismicPage(Footer);

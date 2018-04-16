import React, { Component } from 'react';
import styled from 'styled-components';
import FontAwesome from 'react-fontawesome';
import PrismicPage from '../prismic/PrismicPage';
import { RichText } from 'prismic-reactjs';
import renderLinkSlices from '../utils/renderLinkSlices';
import {
  Container,
  P,
  H2,
  Input,
  H5,
  Button,
  constants,
  MediaQueries,
  GridParent,
} from '../style';

const FooterWrap = Container.extend`
  color: white;
  background-color: ${constants.green};
  padding-top: 0;
  min-height: ${constants.footerMinHeight};
`;

const Contact = styled.div`
  grid-column-start: 8;
  grid-column-end: 13;
  ${MediaQueries.small} {
    grid-column: span 12;
    align-items: center;
  }
`;

const Links = styled.ul`
  display: grid;
  grid-column: span 3;
  grid-template-columns: repeat(2, 1fr);
  font-family: 'proxima-nova';
  font-size: 18px;
  font-weight: 600;
  height: 0;

  ${MediaQueries.small} {
    grid-template-columns: 1fr 1fr;
    grid-column: span 12;
    height: auto;
  }
`;

const Logo = H2.extend`
  grid-column: span 3;
  font-family: 'proxima-soft';
  font-size: 35px;
  font-weight: 500;
  text-transform: uppercase;

  ${MediaQueries.small} {
    grid-column: span 12;
  }
`;

const Social = styled.div`
  grid-column: span 3;
  color: 'white';

  ${MediaQueries.small} {
    grid-column: span 12;
  }
`;

const FootGrid = GridParent.extend`
  padding: 40px;
`;

const SMLink = styled.a`
  color: white;
  flex: 0.5;
`;

const SMLinks = styled.div`
  display: flex;
`;

const ListItem = styled.li``;

const Email = Input.extend`
  margin-bottom: 10px;
`;

class Footer extends Component {
  static pageType = 'footer';

  render() {
    return (
      <FooterWrap>
        <FootGrid>
          <Social>
            <Logo>Mass Hike</Logo>
            <SMLinks>
              <SMLink href="https://www.facebook.com/masshike/" target="blank">
                <FontAwesome name="fab fa-facebook" />
              </SMLink>
              <SMLink href="https://www.instagram.com/masshike/" target="blank">
                <FontAwesome name="fab fa-instagram" />
              </SMLink>
              <SMLink href="https://twitter.com/MassHike" target="blank">
                <FontAwesome name="fab fa-twitter" />
              </SMLink>
            </SMLinks>
          </Social>
          <Links>{renderLinkSlices(this.props.doc.data.body, ListItem)}</Links>
          <Contact>
            <P proxima bold size="large" color="white">
              Sign up to receive newsletters!
            </P>
            <P proxima size="medium" color="white">
              Join the Mass Hike membership list
            </P>
            <label>
              <Email
                type="text"
                value="Email Address"
                onChange={e => this.setState({ Email: e.target.value })}
              />
            </label>
            <Button>
              {RichText.asText(this.props.doc.data.submit_button)}
            </Button>
          </Contact>
        </FootGrid>
      </FooterWrap>
    );
  }
}

export default PrismicPage(Footer);

import React, { Component } from 'react';
import { RichText } from 'prismic-reactjs';
import PrismicPage from '../prismic/PrismicPage';
import ContactFooter from '../components/home/ContactFooter';
import { H1, H6, Input, GridParent, Container, NavMargin } from '../style';
import styled from 'styled-components';

const Column = styled.div`
  grid-column: span 12;
`;
const ExtendInput = Input.extend`
  height: 300px;
`;

class Contact extends Component {
  static pageType = 'contact';

  render() {
    return (
      <Container>
        <NavMargin>
          <GridParent>
            <Column>
              <H1>{RichText.asText(this.props.doc.data.title)}</H1>
              <div>{RichText.render(this.props.doc.data.contact_content)}</div>
            </Column>
          </GridParent>
          <GridParent>
            <Column>
              <label>
                <H6>{RichText.asText(this.props.doc.data.field1)}</H6>
                <Input type="text" />
              </label>
              <label>
                <H6>{RichText.asText(this.props.doc.data.field2)}</H6>
                <Input type="text" />
              </label>
              <label>
                <H6>{RichText.asText(this.props.doc.data.field3)}</H6>
                <ExtendInput type="text" />
              </label>
            </Column>
          </GridParent>
        </NavMargin>
      </Container>
    );
  }
}

export default PrismicPage(Contact);

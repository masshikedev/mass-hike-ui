import React, { Component } from 'react';
import { RichText } from 'prismic-reactjs';
import PrismicPage from '../prismic/PrismicPage';
import {
  H1,
  H6,
  P,
  Input,
  GridParent,
  constants,
  Container,
  Button,
} from '../style';
import styled from 'styled-components';

const Column = styled.div`
  grid-column: span 12;
  padding: 20px;
`;

const ColumnFlex = Column.extend`
  display: flex;
  justify-content: center;
  margin: 50px;
`;

const ExtendInput = Input.extend`
  height: 300px;
`;

const Title = H1.extend`
  margin: 80px auto;
`;

const BGContainer = Container.extend`
  background: ${constants.grayBg};
`;

const WidthContainer = Container.extend`
  max-width: 600px;
  background: none;
`;

class Contact extends Component {
  static pageType = 'contact';

  render() {
    return (
      <BGContainer>
        <WidthContainer>
          <GridParent>
            <Column>
              <Title>{RichText.asText(this.props.doc.data.title)}</Title>
              <P proxima bold color="green" size="large">
                {RichText.render(this.props.doc.data.contact_content)}
              </P>
              <br />
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
            <ColumnFlex>
              <Button primary large>
                Submit
              </Button>
            </ColumnFlex>
          </GridParent>
        </WidthContainer>
      </BGContainer>
    );
  }
}

export default PrismicPage(Contact);

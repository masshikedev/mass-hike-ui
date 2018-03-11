import React, { Component } from 'react';
import { RichText } from 'prismic-reactjs';
import PrismicPage from '../prismic/PrismicPage';
import ContactMain from '../components/contact/ContactMain';
import ContactInput from '../components/contact/ContactInput';
import ContactFooter from '../components/home/ContactFooter';
import { Container } from '../style';
import styled from 'styled-components';

const Wrapper = styled.div`
  display: grid;
  margin-top: 140px;
  grid-gap: 140px;
`;

class Contact extends Component {
  static pageType = 'contact';

  render() {
    return (
      <Container>
        <Wrapper>
          <ContactMain {...this.props} />
          <ContactInput {...this.props} />
        </Wrapper>
      </Container>
    );
  }
}

export default PrismicPage(Contact);

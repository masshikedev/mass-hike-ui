import React, { Component } from 'react';
import PrismicPage from '../prismic/PrismicPage';
import { RichText } from 'prismic-reactjs';
import DonationForm from '../components/donate/DonationForm';
import { H1, P, constants } from '../style';
import styled from 'styled-components';

const Background = styled.div`
  width: 100%;
  height: 100%;
  background: ${constants.grayBg};
`;

const Content = styled.div`
  max-width: 675px;
  width: 80%;
  margin: 0 auto;
  padding-top: 100px;
  padding-bottom: 100px;
`;

const Title = H1.extend`
  margin-bottom: 20px;
`;

class Donate extends Component {
  static pageType = 'donate';
  render() {
    const { doc } = this.props;
    return (
      <Background>
        <Content>
          <Title>{RichText.asText(doc.data.header)}</Title>
          <P proxima bold size="large" color="green">
            {RichText.asText(doc.data.subheader)}
          </P>
          <DonationForm />
        </Content>
      </Background>
    );
  }
}

export default PrismicPage(Donate);

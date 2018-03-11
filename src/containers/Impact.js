import React, { Component } from 'react';
import { RichText } from 'prismic-reactjs';
import PrismicPage from '../prismic/PrismicPage';
import ImpactMain from '../components/impact/ImpactMain';
import ImpactHero from '../components/impact/ImpactHero';
import ImpactStats from '../components/impact/ImpactStats';
import ContactFooter from '../components/home/ContactFooter';
import { Container } from '../style';
import styled from 'styled-components';

const Wrapper = styled.div`
  display: grid;
  margin-top: 140px;
  grid-gap: 140px;
`;

class Impact extends Component {
  static pageType = 'impact';

  render() {
    console.log(this.props);
    return (
      <Container>
        <Wrapper>
          <ImpactMain {...this.props} />
          <ImpactHero {...this.props} />
          <ImpactStats {...this.props} />
        </Wrapper>
      </Container>
    );
  }
}

export default PrismicPage(Impact);

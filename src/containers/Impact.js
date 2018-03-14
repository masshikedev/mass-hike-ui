import React, { Component } from 'react';
import { RichText } from 'prismic-reactjs';
import PrismicPage from '../prismic/PrismicPage';
import ImpactMain from '../components/impact/ImpactMain';
import ImpactHero from '../components/impact/ImpactHero';
import ImpactStats from '../components/impact/ImpactStats';
import ContactFooter from '../components/home/ContactFooter';
import { NavMargin, Container } from '../style';
import styled from 'styled-components';

class Impact extends Component {
  static pageType = 'impact';

  render() {
    return (
      <Container>
        <NavMargin>
          <ImpactMain {...this.props} />
          <ImpactHero {...this.props} />
          <ImpactStats {...this.props} />
        </NavMargin>
      </Container>
    );
  }
}

export default PrismicPage(Impact);

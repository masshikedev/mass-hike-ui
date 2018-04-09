import React, { Component } from 'react';
import PrismicPage from '../prismic/PrismicPage';
import ImpactMain from '../components/impact/ImpactMain';
import ImpactHero from '../components/impact/ImpactHero';
import ImpactStats from '../components/impact/ImpactStats';
import Testimonial from '../components/impact/Testimonial';
import { Container } from '../style';

class Impact extends Component {
  static pageType = 'impact';

  render() {
    return (
      <Container>
        <ImpactMain {...this.props} />
        <ImpactStats {...this.props} />
        <ImpactHero {...this.props} />
        <Testimonial {...this.props} />
      </Container>
    );
  }
}

export default PrismicPage(Impact);

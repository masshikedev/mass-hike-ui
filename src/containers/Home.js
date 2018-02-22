import React, { Component } from 'react';
import { RichText } from 'prismic-reactjs';
import PrismicPage from '../prismic/PrismicPage';
import HomeMain from '../components/home/HomeMain';
import HomeSummary from '../components/home/HomeSummary';
import HomeDetails from '../components/home/HomeDetails';
import HomeNext from '../components/home/HomeNext';
import ContactFooter from '../components/home/ContactFooter';
import { Container } from '../style';

class Home extends Component {
  static pageType = 'homepage';

  render() {
    return (
      <Container>
        <HomeMain />
        <HomeSummary />
        <HomeDetails />
        <HomeNext />
        <ContactFooter />
      </Container>
    );
  }
}

export default PrismicPage(Home);

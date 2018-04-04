import React, { Component } from 'react';
import PrismicPage from '../prismic/PrismicPage';
import HomeMain from '../components/home/HomeMain';
import HomeSummary from '../components/home/HomeSummary';
import HomeDetails from '../components/home/HomeDetails';
import HomeNext from '../components/home/HomeNext';
import { Container } from '../style';

class Home extends Component {
  static pageType = 'homepage';

  render() {
    return (
      <Container>
        <HomeMain {...this.props} />
        <HomeSummary {...this.props} />
        <HomeDetails {...this.props} />
        <HomeNext {...this.props} />
      </Container>
    );
  }
}

export default PrismicPage(Home);

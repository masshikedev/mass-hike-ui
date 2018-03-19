import React, { Component } from 'react';
import { RichText } from 'prismic-reactjs';
import PrismicPage from '../prismic/PrismicPage';
import HomeMain from '../components/home/HomeMain';
import HomeSummary from '../components/home/HomeSummary';
import HomeDetails from '../components/home/HomeDetails';
import HomeNext from '../components/home/HomeNext';
import { NavMargin, Container } from '../style';
import styled from 'styled-components';

class Home extends Component {
  static pageType = 'homepage';

  render() {
    return (
      <Container>
        <NavMargin>
          <HomeMain {...this.props} />
          <HomeSummary {...this.props} />
          <HomeDetails {...this.props} />
          <HomeNext {...this.props} />
        </NavMargin>
      </Container>
    );
  }
}

export default PrismicPage(Home);

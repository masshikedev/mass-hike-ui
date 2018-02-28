import React, { Component } from 'react';
import PrismicPage from '../prismic/PrismicPage';
import HomeMain from '../components/home/HomeMain';
import HomeSummary from '../components/home/HomeSummary';
import HomeDetails from '../components/home/HomeDetails';
import HomeNext from '../components/home/HomeNext';
import ContactFooter from '../components/home/ContactFooter';
import { Container } from '../style';
import styled from 'styled-components';

const Wrapper = styled.div`
  display: grid;
  margin-top: 140px;
  grid-gap: 140px;
`;

class Home extends Component {
  static pageType = 'homepage';

  render() {
    return (
      <Container>
        <Wrapper>
          <HomeMain {...this.props} />
          <HomeSummary {...this.props} />
          <HomeDetails {...this.props} />
          <HomeNext {...this.props} />
          <ContactFooter {...this.props} />
        </Wrapper>
      </Container>
    );
  }
}

export default PrismicPage(Home);

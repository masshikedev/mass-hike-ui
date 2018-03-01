import React, { Component } from 'react';
import { RichText } from 'prismic-reactjs';
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

class About extends Component {
  static pageType = 'about';

  render() {
    return (
      <Container>
        <Wrapper>
          <div>this is the about page</div>
        </Wrapper>
      </Container>
    );
  }
}

export default PrismicPage(About);

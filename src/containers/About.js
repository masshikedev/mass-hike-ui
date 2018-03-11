import React, { Component } from 'react';
import { RichText } from 'prismic-reactjs';
import PrismicPage from '../prismic/PrismicPage';
import TeamList from '../components/about/TeamList';
import AboutMain from '../components/about/AboutMain';
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
          <AboutMain {...this.props} />
          <TeamList {...this.props.doc.data} />
        </Wrapper>
      </Container>
    );
  }
}

export default PrismicPage(About);

import React, { Component } from 'react';
import { RichText } from 'prismic-reactjs';
import PrismicPage from '../prismic/PrismicPage';
import TeamList from '../components/about/TeamList';
import AboutMain from '../components/about/AboutMain';
import AboutStory from '../components/about/AboutStory';
import WhatWeDo from '../components/about/WhatWeDo';
import { Container, NavMargin } from '../style';
import styled from 'styled-components';

class About extends Component {
  static pageType = 'about';

  render() {
    return (
      <Container>
        <AboutMain {...this.props} />
        <AboutStory {...this.props} />
        <WhatWeDo {...this.props} />
        <TeamList {...this.props.doc.data} />
      </Container>
    );
  }
}

export default PrismicPage(About);

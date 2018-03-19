import React, { Component } from 'react';
import { push } from 'react-router-redux';
import { bindActionCreators } from 'redux';
import PrismicPage from '../../prismic/PrismicPage';
import { connect } from 'react-redux';
import styled from 'styled-components';
import {
  H1,
  H2,
  H3,
  H4,
  P,
  Button,
  MediaQueries,
  Img,
  GridParent,
  Container,
  NavMargin,
} from '../../style';

const Column = styled.div`
  grid-column: span 12;
  height: 500px;
`;

function BlogInfo(props) {
  console.log(props);

  return (
    <Container>
      <NavMargin>
        <GridParent>
          <Column>
            <H1>This is a blog post</H1>
            <H2>The main image for this post goes here</H2>
            <H2>The title of the image will go here</H2>
            <H4>The author and date will go here</H4>
            <P>The main content of the post will go here</P>
          </Column>
        </GridParent>
      </NavMargin>
    </Container>
  );
}

export default PrismicPage(BlogInfo);

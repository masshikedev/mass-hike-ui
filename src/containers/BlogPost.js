import React, { Component } from 'react';
import { push } from 'react-router-redux';
import { bindActionCreators } from 'redux';
import PrismicPage from '../prismic/PrismicPage';
import { connect } from 'react-redux';
import styled from 'styled-components';
import { RichText } from 'prismic-reactjs';
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
} from '../style';

const Column = styled.div`
  grid-column: span 12;
`;

class BlogPost extends Component {
  static pageType = 'blogpost';

  render() {
    return (
      <Container>
        <H1>{RichText.asText(this.props.doc.data.blog_title)}</H1>
        <H4>
          {this.props.doc.data.blog_date} -{' '}
          {RichText.asText(this.props.doc.data.blog_author)}
        </H4>
        <Img src={this.props.doc.data.blog_image.url} />
        <P>{RichText.render(this.props.doc.data.blog_content)}</P>
      </Container>
    );
  }
}

export default PrismicPage(BlogPost);

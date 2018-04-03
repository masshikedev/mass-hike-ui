import React, { Component } from 'react';
import PrismicPage from '../prismic/PrismicPage';
import { RichText } from 'prismic-reactjs';
import { H1, H4, P, Img, Container } from '../style';

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

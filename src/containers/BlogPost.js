import React, { Component } from 'react';
import styled from 'styled-components';
import PrismicPage from '../prismic/PrismicPage';
import { RichText } from 'prismic-reactjs';
import BlogAuthor from '../components/blog/BlogAuthor';
import {
  H1,
  H4,
  P,
  Img,
  Container,
  GridParent,
  constants,
  MediaQueries,
} from '../style';

const Image = styled.div`
  background-image: url(${props => props.bg});
  grid-column: span 5;
  background-position: center;
  background-size: cover;
  background-repeat: no-repeat;
  min-height: 300px;

  ${MediaQueries.small} {
    grid-column: span 12;
  }
`;

const Title = styled.div`
  grid-column: span 7;
  background: ${constants.lightgreenBg};
  color: #fff;
  padding: 40px;
  padding-top: 120px;

  ${MediaQueries.small} {
    grid-column: span 12;
  }
`;

const TitleContainer = GridParent.extend`
  grid-gap: 0;
`;

const BlogContent = styled.div`
  max-width: 675px;
  margin: 0 auto;
  padding-bottom: 40px;

  ${MediaQueries.small} {
    padding: 40px 20px;
  }
`;

class BlogPost extends Component {
  static pageType = 'blogpost';

  render() {
    return (
      <Container>
        <TitleContainer>
          <Title>
            <H1>{RichText.asText(this.props.doc.data.blog_title)}</H1>
            <P proxima extrabold size="large" color="white">
              {RichText.asText(this.props.doc.data.blog_subtitle)}
            </P>
          </Title>
          <Image bg={this.props.doc.data.blog_image.url} />
        </TitleContainer>
        <BlogContent>
          <BlogAuthor {...this.props.doc.data} />
          {RichText.render(this.props.doc.data.blog_content)}
        </BlogContent>
      </Container>
    );
  }
}

export default PrismicPage(BlogPost);

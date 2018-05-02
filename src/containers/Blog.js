import React, { Component } from 'react';
import { RichText } from 'prismic-reactjs';
import PrismicRepeatable from '../prismic/PrismicRepeatable';
import BlogPreview from '../components/blog/BlogPreview';
import BlogPreviewLarge from '../components/blog/BlogPreviewLarge';
import { GridParent, H1, Container, MediaQueries } from '../style';

const Previews = GridParent.extend`
  padding: 60px 0;
  grid-gap: 60px;
  max-width: 1200px;
  width: 90%;
  margin: 0 auto;

  ${MediaQueries.small} {
    width: 100%;
    min-width: 0;
    grid-column-gap: 0;
  }
`;

const Title = H1.extend`
  text-align: center;
  margin: 0;
  padding-top: 70px;
  display: ${props => (props.showSmall ? 'none' : 'block')};
  ${MediaQueries.small} {
    padding-top: 50px;
    display: ${props => (props.showLarge ? 'none' : 'block')};
  }
`;

class Blog extends Component {
  static pageType = 'blogpost';

  renderBlogPreviews() {
    let results = this.props.doc.results;
    results = results.slice(1, results.length);
    const blogs = results.map(blog => {
      return (
        <BlogPreview
          uid={blog.uid}
          title={RichText.asText(blog.data.blog_title)}
          date={blog.data.blog_date}
          image={blog.data.blog_image.url}
          author={RichText.asText(blog.data.blog_author)}
          preview={blog.data.preview_text}
          content={RichText.asText(blog.data.blog_content)}
        />
      );
    });
    return blogs;
  }

  render() {
    const first = this.props.doc.results[0];

    return (
      <Container>
        <Title showSmall center>
          Our Blog
        </Title>
        <BlogPreviewLarge
          uid={first.uid}
          title={RichText.asText(first.data.blog_title)}
          date={first.data.blog_date}
          image={first.data.blog_image.url}
          author={RichText.asText(first.data.blog_author)}
          content={RichText.asText(first.data.blog_content)}
          preview={first.data.preview_text}
        />
        <Title showLarge>Our Blog</Title>
        <Previews>{this.renderBlogPreviews()}</Previews>
      </Container>
    );
  }
}

export default PrismicRepeatable(Blog);

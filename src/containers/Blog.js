import React, { Component } from 'react';
import { RichText } from 'prismic-reactjs';
import PrismicRepeatable from '../prismic/PrismicRepeatable';
import BlogPreview from '../components/blog/BlogPreview';
import { H1, Container } from '../style';

class Blog extends Component {
  static pageType = 'blogpost';

  renderBlogPreviews() {
    const results = this.props.doc.results;
    const blogs = results.map(blog => {
      return (
        <BlogPreview
          uid={blog.uid}
          title={RichText.asText(blog.data.blog_title)}
          date={blog.data.blog_date}
          image={blog.data.blog_image.url}
          author={RichText.asText(blog.data.blog_author)}
          content={RichText.asText(blog.data.blog_content)}
          order="right"
        />
      );
    });
    return blogs;
  }

  render() {
    return (
      <Container>
        <H1>Blog</H1>
        {this.renderBlogPreviews()}
      </Container>
    );
  }
}

export default PrismicRepeatable(Blog);

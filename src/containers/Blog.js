import React, { Component } from 'react';
import { RichText } from 'prismic-reactjs';
import PrismicRepeatable from '../prismic/PrismicRepeatable';
import BlogPreview from '../components/blog/BlogPreview';
import { H1, Container, NavMargin } from '../style';
import styled from 'styled-components';

class Blog extends Component {
  static pageType = 'blogpost';

  render() {
    return (
      <Container>
        <NavMargin>
          <H1>Blog</H1>
          {this.renderBlogPreviews()}
        </NavMargin>
      </Container>
    );
  }

  renderBlogPreviews() {
    const results = this.props.doc.results;
    console.log(results);
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
}

export default PrismicRepeatable(Blog);

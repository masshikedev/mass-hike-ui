import React, { Component } from 'react';
import PrismicPage from '../prismic/PrismicPage';
import BlogPreview from '../components/blog/BlogPreview';
import { H1, Container } from '../style';

class Blog extends Component {
  static pageType = 'blog';
  //TODO: Return blogposts from Prismic dynamically.  Using static data for now.
  render() {
    return (
      <Container>
        <H1>Blog</H1>
        <BlogPreview
          title="Benefits of Taking a Hike"
          date="February 10, 2018"
          author="Camden Phalen"
          content="Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quod facere nam, sunt minus eveniet, perferendis dicta! Illum, alias, modi. Placeat!"
          order="left"
          img={this.props.doc.data.blog_image.url}
        />
        <BlogPreview
          title="Trip Journal: Middlesex Fells Reservation"
          date="February 10, 2018"
          author="Camden Phalen"
          content="Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quod facere nam, sunt minus eveniet, perferendis dicta! Illum, alias, modi. Placeat!"
          order="right"
          img={this.props.doc.data.blog_image.url}
        />
      </Container>
    );
  }
}

export default PrismicPage(Blog);

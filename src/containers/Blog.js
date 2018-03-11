import React, { Component } from 'react';
import { RichText } from 'prismic-reactjs';
import PrismicPage from '../prismic/PrismicPage';
import BlogPreview from '../components/blog/BlogPreview';
import ContactFooter from '../components/home/ContactFooter';
import { H1, Container } from '../style';
import styled from 'styled-components';

const Wrapper = styled.div`
  display: grid;
  margin-top: 140px;
  grid-gap: 140px;
`;

class Blog extends Component {
  static pageType = 'blog';
  //TODO: Return blogposts from Prismic dynamically.  Using static data for now.
  render() {
    return (
      <Container>
        <Wrapper>
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
        </Wrapper>
      </Container>
    );
  }
}

export default PrismicPage(Blog);

import React, { Component } from 'react';
import styled from 'styled-components';
import { push } from 'react-router-redux';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import {
  H2,
  H3,
  H4,
  P,
  Button,
  MediaQueries,
  Img,
  GridParent,
} from '../../style';
import { RichText } from 'prismic-reactjs';

const Column = styled.div`
  grid-column: span 6;

  ${MediaQueries.small} {
    grid-column: span 12;
  }
`;

class BlogPreview extends Component {
  render() {
    return (
      <GridParent>
        <Column>
          <Img src={this.props.image} />
        </Column>
        <Column>
          <H2>{this.props.title}</H2>
          <H4>
            {this.props.date} - by {this.props.author}
          </H4>
          <P>{this.props.content}</P>
          <Button onClick={() => this.props.toFull(this.props.id)}>
            Read More
          </Button>
        </Column>
      </GridParent>
    );
  }
}

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      toFull: id => push(`blog/${id}`),
    },
    dispatch
  );

export default connect(this.props, mapDispatchToProps)(BlogPreview);

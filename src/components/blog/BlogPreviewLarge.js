import React, { Component } from 'react';
import styled from 'styled-components';
import { push } from 'react-router-redux';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import {
  H2,
  H4,
  P,
  Button,
  MediaQueries,
  Img,
  GridParent,
  constants,
} from '../../style';
import moment from 'moment';
import { MONTH_DATE_YEAR } from '../../utils/dateFormats';
import { RichText } from 'prismic-reactjs';

const Preview = GridParent.extend`
  grid-template-columns: repeat(24, 1fr);
  grid-gap: 0;
`;

const Column = styled.div`
  padding: 60px;
  grid-column: span 10;
  background: ${constants.offwhiteBg};

  ${MediaQueries.small} {
    grid-column: span 24;
  }
`;

const ImgFH = Img.extend`
  max-height: 300px;
`;

const Title = P.extend``;

const Image = Column.extend`
  background-image: url(${props => props.bg});
  grid-column: span 13;
  background-position: center;
  background-size: cover;
  background-repeat: no-repeat;
  min-height: 300px;
`;

const LeftBorder = styled.div`
  grid-column: span 1;
  min-height: 20px;
  background: ${constants.orangeBg};

  ${MediaQueries.small} {
    grid-column: span 24;
  }
`;

class BlogPreviewLarge extends Component {
  render() {
    return (
      <Preview>
        <LeftBorder />
        <Image bg={this.props.image} />
        <Column>
          <Title color="green" size="xlarge" proxima extrabold>
            {this.props.title}
          </Title>
          <P proxima bold size="large">
            {moment.utc(this.props.date).format(MONTH_DATE_YEAR)}
          </P>
          <P proxima>{RichText.asText(this.props.preview)}</P>
          <Button primary onClick={() => this.props.toFull(this.props.uid)}>
            Read More
          </Button>
        </Column>
      </Preview>
    );
  }
}

function trimPostContent(post) {
  let maxLength = 375;
  let trimmedString = post.substr(0, maxLength);
  trimmedString = trimmedString.substr(
    0,
    Math.min(trimmedString.length, trimmedString.lastIndexOf(' '))
  );
  return trimmedString;
}

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      toFull: uid => push(`blog/${uid}`),
    },
    dispatch
  );

export default connect(null, mapDispatchToProps)(BlogPreviewLarge);

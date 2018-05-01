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

const Preview = GridParent.extend`
  grid-column: span 4;
  grid-gap: 0;

  ${MediaQueries.medium} {
    grid-column: span 6;
  }

  ${MediaQueries.small} {
    grid-column: span 12;
  }
`;

const Column = styled.div`
  padding: 20px;
  grid-column: span 12;
  background: ${constants.offwhiteBg};

  ${MediaQueries.small} {
    grid-column: span 12;
  }
`;

const ImgFH = Img.extend`
  max-height: 300px;
`;

const Title = styled.div`
  min-height: 140px;

  ${MediaQueries.small} {
    min-height: auto;
  }
`;

const Image = Column.extend`
  background-image: url(${props => props.bg});
  background-position: center;
  background-size: cover;
  background-repeat: no-repeat;
  height: 300px;
  border-bottom: solid ${constants.green} 20px;
`;

class BlogPreview extends Component {
  render() {
    return (
      <Preview>
        <Image bg={this.props.image} />
        <Column>
          <Title>
            <P color="green" size="large" proxima bold>
              {this.props.title}
            </P>
            <P proxima bold size="medium">
              {moment.utc(this.props.date).format(MONTH_DATE_YEAR)}
            </P>
          </Title>
          <Button onClick={() => this.props.toFull(this.props.uid)}>
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

export default connect(null, mapDispatchToProps)(BlogPreview);
